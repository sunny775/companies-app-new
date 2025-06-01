"use client";
import { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import Transition from "../Transition";
import { useSelect } from "./SelectContext";

const selectDropdownStyles = tv({
  base: "absolute z-[999] mt-1 bg-surface shadow-lg rounded-md py-1 text-base border border-gray-600/10 sm:text-sm overflow-hidden",
  variants: {
    placement: {
      "bottom-start": "top-full left-0",
      bottom: "top-full left-1/2 -translate-x-1/2",
      "bottom-end": "top-full right-0",
      "top-start": "bottom-full left-0",
      top: "bottom-full left-1/2 -translate-x-1/2",
      "top-end": "bottom-full right-0",
    },
    width: {
      auto: "",
      full: "w-full",
      sm: "w-40",
      md: "w-52",
      lg: "w-64",
    },
  },
  defaultVariants: {
    placement: "bottom-start",
    width: "full",
  },
});

export interface SelectDropdownProps extends VariantProps<typeof selectDropdownStyles> {
  children: ReactNode;
  className?: string;
}

export function SelectDropdown({ children, className, width, placement }: SelectDropdownProps) {
  const { isOpen } = useSelect();

  return (
    <Transition show={isOpen}>
      <div className={selectDropdownStyles({ placement, width, className })}>{children}</div>
    </Transition>
  );
}
