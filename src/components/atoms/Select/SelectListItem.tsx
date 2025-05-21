"use client";
import cn from "@/lib/utils/cn";
import { Check } from "lucide-react";
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
      <span className={`block ${isSelected ? "font-medium" : "font-normal"}`}>{children}</span>

      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-500">
          <Check className="size-4 stroke-1" />
        </span>
      )}
    </li>
  );
}
