"use client";

import { ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState, KeyboardEvent } from "react";
import useScrollLock from "@/lib/hooks/useScrollLock";
import { MenuContextProvider } from "./MenuContext";

export interface MenuRootProps {
  children: ReactNode;
  id?: string;
  placement?: "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end";
  lockScroll?: boolean;
  onClose?: () => void;
  defaultOpen?: boolean;
  closeOnItemClick?: boolean;
}

export function MenuRoot({
  id,
  children,
  placement = "bottom-start",
  lockScroll = false,
  onClose,
  defaultOpen = false,
  closeOnItemClick = true,
}: MenuRootProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuListRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const { lockScroll: handleLockScroll, unlockScroll } = useScrollLock();

  const defaultId = useId();
  const menuId = `${id ?? defaultId}-menu`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Scroll focused item into view when focused index changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
      itemsRef.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    if (lockScroll) {
      if (isOpen) {
        handleLockScroll();
      } else {
        unlockScroll();
      }
    }
  }, [isOpen, lockScroll, handleLockScroll, unlockScroll]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      const itemsCount = itemsRef.current.filter(Boolean).length;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeMenu();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev < itemsCount - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(itemsCount > 0 ? 0 : -1);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(itemsCount > 0 ? itemsCount - 1 : -1);
          break;
        case "Tab":
          closeMenu();
          break;
        default:
          break;
      }
    },
    [closeMenu]
  );

  const contextValue = useMemo(
    () => ({
      id,
      isOpen, 
      setIsOpen,
      focusedIndex,
      setFocusedIndex,
      menuRef,
      menuListRef,
      itemsRef,
      menuId,
      handleListKeyDown,
      closeMenu,
      closeOnItemClick,
    }),
    [
      id,
      isOpen,
      setIsOpen,
      focusedIndex,
      setFocusedIndex,
      menuRef,
      menuListRef,
      itemsRef,
      menuId,
      handleListKeyDown,
      closeMenu,
      closeOnItemClick,
    ]
  );

  return (
    <MenuContextProvider value={contextValue}>
      <div 
        ref={menuRef} 
        className="relative" 
        data-placement={placement}
      >
        {children}
      </div>
    </MenuContextProvider>
  );
}