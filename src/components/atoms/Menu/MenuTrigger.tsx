"use client";

import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import React, { ComponentProps, KeyboardEvent, ReactNode, useCallback } from "react";
import { tv } from "tailwind-variants";
import { useMenu } from "./MenuContext";

export interface MenuTriggerProps {
  children: ReactNode;
  arrow?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export const menuTriggerStyles = tv({
  base: "relative w-full h-10 bg-surface font-sans font-normal rounded-md focus:outline-0 disabled:opacity-80 disabled:cursor-not-allowed transition-all border border-gray-600/20 text-center",
  slots: {
    arrow:
      "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all text-gray-400 dark:text-gray-600",
  },

  variants: {
    open: {
      true: {
        arrow: "rotate-180 mt-px",
      },
    },
  },
});

export function MenuTrigger({ children, arrow, className, asChild = false }: MenuTriggerProps) {
  const { isOpen, setIsOpen, menuId } = useMenu();

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setIsOpen(true);
      }
    },
    [isOpen, setIsOpen]
  );

  const triggerProps: ComponentProps<"button"> = {
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? menuId : undefined,
    onClick: () => setIsOpen(!isOpen),
    onKeyDown: handleKeyDown,
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      ...triggerProps,
      className: cn(child.props.className, className),
    });
  }

  const styles = menuTriggerStyles({
    open: isOpen,
  });

  return (
    <button type="button" className={styles.base({ className })} {...triggerProps}>
      {children}
      <div className={styles.arrow()}>{arrow ?? <ChevronDown strokeWidth={1} />}</div>
    </button>
  );
}
