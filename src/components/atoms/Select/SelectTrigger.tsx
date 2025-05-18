"use client";

import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import React, { ComponentProps, ElementType, KeyboardEvent, ReactNode, useCallback } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useSelect } from "./SelectContext";

export const selectTriggerStyles = tv({
  base: "flex items-center justify-between gap-1 px-2 relative w-full h-10 bg-transparent rounded-md focus:outline-0 disabled:opacity-80 disabled:cursor-not-allowed transition-all border text-center text-sm font-light",
  slots: {
    arrow: "size-4 rotate-0 transition-all text-muted flex items-center justify-center",
  },

  variants: {
    open: {
      true: {
        arrow: "rotate-180 mr-1",
        base: "pr-1",
      },
    },
    color: {
      default: "border-gray-600/20",
      error: "border-red-600/20",
      success: "border-green-600/20",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export interface SelectTriggerProps extends Omit<VariantProps<typeof selectTriggerStyles>, "open"> {
  children: ReactNode;
  error?: boolean;
  success?: boolean;
  arrow?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export function SelectTrigger({ className, children, arrow, color, success, error, asChild }: SelectTriggerProps) {
  const { id, labelId, disabled, isOpen, setIsOpen, selectedOption, listboxId } = useSelect();

  const styles = selectTriggerStyles({
    open: isOpen,
    color: success ? "success" : error ? "error" : color,
  });

  // Handle keyboard events when dropdown is closed
  const handleButtonKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
    },
    [isOpen, setIsOpen]
  );

  const triggerProps: ComponentProps<"button"> = {
    id,
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen,
    "aria-labelledby": labelId,
    "aria-controls": isOpen ? listboxId : undefined,
    "aria-disabled": disabled,
    onClick: () => !disabled && setIsOpen(!isOpen),
    onKeyDown: (e) => {
      handleButtonKeyDown(e);
    },
    disabled,
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<ComponentProps<ElementType>>;
    return React.cloneElement(child, {
      ...child.props,
      ...triggerProps,
      className: cn(child.props.className, className),
    });
  }

  return (
    <button type="button" className={styles.base({ className })} {...triggerProps}>
      {selectedOption ? <span>{selectedOption}</span> : <span>{children}</span>}
      <span className={styles.arrow()}>{arrow ?? <ChevronDown />}</span>
    </button>
  );
}
