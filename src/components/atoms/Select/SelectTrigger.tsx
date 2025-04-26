"use client";

import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import { KeyboardEvent, ReactNode, useCallback } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useSelect } from "./SelectContext";

export const selectTriggerStyles = tv({
  base: "relative w-full h-10 bg-transparent font-sans font-normal rounded-md focus:outline-0 disabled:opacity-80 disabled:cursor-not-allowed transition-all border text-center",
  slots: {
    arrow:
      "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all text-gray-400 dark:text-gray-600",
    buttonContent: "absolute top-2/4 -translate-y-2/4 left-0 right-0 text-left p-3",
    placeholder: "text-gray-400 dark:text-gray-600",
  },

  variants: {
    open: {
      true: {
        arrow: "rotate-180 mt-px",
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
}

export function SelectTrigger({ className, children, arrow, color, success, error }: SelectTriggerProps) {
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

  return (
    <button
      type="button"
      id={id}
      className={styles.base({ className })}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby={labelId}
      aria-controls={isOpen ? listboxId : undefined}
      aria-disabled={disabled}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      onKeyDown={(e) => {
        handleButtonKeyDown(e);
      }}
      disabled={disabled}
    >
      {selectedOption ? (
        <span className={styles.buttonContent()}>{selectedOption}</span>
      ) : (
        <span className={cn(styles.buttonContent(), styles.placeholder())}>{children}</span>
      )}
      <div className={styles.arrow()}>{arrow ?? <ChevronDown strokeWidth={1} />}</div>
    </button>
  );
}
