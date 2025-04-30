"use client";
import useScrollLock from "@/lib/hooks/useScrollLock";
import { KeyboardEvent, MouseEvent, ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { SelectContextProvider } from "./SelectContext";
import cn from "@/lib/cn";

export interface SelectRootProps {
  filteredOptions: string[];
  children: ReactNode;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  id?: string;
  showLabel?: boolean;
  label?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  lockstroll?: boolean;
  className?: string;
}

export function SelectRoot({
  filteredOptions = [],
  id,
  showLabel,
  label = "Select an option",
  onChange = () => {},
  defaultValue,
  disabled = false,
  required = false,
  children,
  searchQuery,
  setSearchQuery,
  lockstroll,
  className
}: SelectRootProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultValue || null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const selectRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

  const { lockScroll: handleLockScroll, unlockScroll } = useScrollLock();

  const defaultId = useId();

  id = id ?? defaultId;

  useEffect(() => {
    // Reset focused index when filtered options change
    setFocusedIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [searchQuery, filteredOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearchQuery]);

  const selectOption = useCallback(
    (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
      setSearchQuery("");
      onChange(option);
    },
    [onChange, setSearchQuery]
  );

  // Scroll focused option into view when focused index changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    if (lockstroll) {
      if (isOpen) {
        handleLockScroll();
      } else {
        unlockScroll();
      }
    }
  }, [isOpen, lockstroll, handleLockScroll, unlockScroll]);

  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const searchId = `${id}-search`;

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSearchQuery("");
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(filteredOptions.length > 0 ? 0 : -1);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(filteredOptions.length > 0 ? filteredOptions.length - 1 : -1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            selectOption(filteredOptions[focusedIndex]);
          }
          break;
        default:
          break;
      }
    },
    [filteredOptions, focusedIndex, selectOption, setFocusedIndex, setIsOpen, setSearchQuery]
  );

  const contextValue = useMemo(
    () => ({
      id,
      label,
      onChange,
      defaultValue,
      disabled,
      required,
      isOpen,
      setIsOpen,
      selectedOption,
      setSelectedOption,
      focusedIndex,
      setFocusedIndex,
      searchQuery,
      setSearchQuery,
      filteredOptions,
      selectRef,
      listboxRef,
      searchInputRef,
      optionsRef,
      labelId,
      listboxId,
      searchId,
      selectOption,
    }),
    [
      id,
      label,
      onChange,
      defaultValue,
      disabled,
      required,
      isOpen,
      setIsOpen,
      selectedOption,
      setSelectedOption,
      focusedIndex,
      setFocusedIndex,
      searchQuery,
      setSearchQuery,
      filteredOptions,
      labelId,
      listboxId,
      searchId,
      selectOption,
    ]
  );

  return (
    <SelectContextProvider value={contextValue}>
      <div className={cn("relative", className)} ref={selectRef} onKeyDown={handleListKeyDown}>
        {showLabel && (
          <label id={labelId} htmlFor={id} className="block text-sm font-medium mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {children}
      </div>
    </SelectContextProvider>
  );
}
