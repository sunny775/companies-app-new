"use client";

import cn from "@/lib/cn";
import { ChevronDown } from "lucide-react";
import React, { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useSelect } from "./Context";

export const selectTriggerStyles = tv({
  base: "w-full h-full bg-transparent font-sans font-normal rounded-md focus:outline-0 disabled:bg-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border",
  slots: {
    arrow:
      "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all text-gray-500",
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
      default: "border-black/10 dark:border-white/10 focus:border-green-500/50 dark:focus:border-green-500/30",
      error: "border-red-600/30 dark:border-red-500/20  focus:border-red-500/50 dark:focus:border-red-500/30",
      success: "border-green-500/30",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export interface SelectTriggerProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof selectTriggerStyles> {
  error?: boolean;
  success?: boolean;
  arrow?: ReactNode;
  children: ReactNode;
}

export const Trigger = ({ color, error, success, arrow, className, children, ...rest }: SelectTriggerProps) => {
  const { open, getReferenceProps, selectedIndex, refs, listItems } = useSelect();

  const styles = selectTriggerStyles({
    open,
    color: success ? "success" : error ? "error" : color,
  });

  return (
    <button
      type="button"
      {...rest}
      tabIndex={0}
      ref={refs.setReference}
      className={styles.base({ className })}
      {...getReferenceProps()}
    >
      {selectedIndex ? (
        <span className={styles.buttonContent()}>{listItems[selectedIndex]}</span>
      ) : (
        <span className={cn(styles.buttonContent(), styles.placeholder())}>{children}</span>
      )}
      <div className={styles.arrow()}>{arrow ?? <ChevronDown strokeWidth={1} />}</div>
    </button>
  );
};
