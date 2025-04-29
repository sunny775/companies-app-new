"use client";
import cn from "@/lib/cn";
import { MouseEventHandler, ReactNode } from "react";
import { useSelect } from "./SelectContext";

export interface SelectListItemProps {
  value: string;
  children: ReactNode;
  label?: string;
  index?: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export function SelectListItem({ value, index = 0, className, children, onClick }: SelectListItemProps) {
  const { id, selectedOption, focusedIndex, setFocusedIndex, optionsRef, selectOption } = useSelect();

  const isSelected = selectedOption && selectedOption === value;
  const isFocused = focusedIndex === index;

  return (
    <li
      id={`${id}-option-${value}`}
      ref={(el) => {
        optionsRef.current[index] = el;
      }}
      role="option"
      aria-selected={!!isSelected}
      data-index={index}
      data-active={isFocused}
      data-selected={isSelected}
      className={cn(
        `cursor-default select-none relative py-2 pl-3 pr-9 data-[active=true]:bg-green-600/10 data-[active=true]:text-green-500 data-[selected=true]:border-t data-[selected=true]:border-b data-[selected=true]:border-green-600/10 data-[selected=true]:text-green-500`,
        className
      )}
      onClick={(event) => {
        selectOption(value);
        onClick?.(event);
      }}
      onMouseEnter={() => setFocusedIndex(index)}
    >
      <span className={`block truncate ${isSelected ? "font-medium" : "font-normal"}`}>{children}</span>

      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-500">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </li>
  );
}
