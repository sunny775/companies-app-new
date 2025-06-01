"use client";

import cn from "@/lib/utils/cn";
import { MouseEvent, ReactNode } from "react";
import { useMenu } from "./MenuContext";

export interface MenuItemProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLLIElement>) => void;
  disabled?: boolean;
  index?: number;
  className?: string;
  icon?: ReactNode;
  shortcut?: string;
  divide?: boolean;
}

export function MenuItem({
  children,
  onClick,
  disabled = false,
  index = 0,
  className,
  icon,
  shortcut,
  divide,
}: MenuItemProps) {
  const { focusedIndex, setFocusedIndex, itemsRef, closeMenu, closeOnItemClick } = useMenu();

  const isFocused = focusedIndex === index;

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    if (disabled) return;

    if (onClick) onClick(e);
    if (closeOnItemClick) closeMenu();
  };

  return (
    <li
      ref={(el) => {
        itemsRef.current[index] = el;
      }}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      data-index={index}
      data-focused={isFocused}
      data-disabled={disabled}
      className={cn(
        "cursor-pointer select-none relative px-4 py-2 flex items-center text-sm",
        "transition-colors duration-150",
        "focus:outline-none",
        "data-[focused=true]:bg-green-600/10 data-[focused=true]:text-green-500",
        "data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed",
        { "border-b border-gray-600/20": divide },
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setFocusedIndex(index)}
    >
      {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
      <span className="flex-grow">{children}</span>
      {shortcut && <span className="ml-auto pl-4 text-xs text-gray-500 dark:text-gray-400">{shortcut}</span>}
    </li>
  );
}
