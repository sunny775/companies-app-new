"use client";
import React, { ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import Transition from "../Transition";
import { useMenu } from "./MenuContext";
import { MenuItemProps } from "./MenuItem";

const menuDropdownStyles = tv({
  base: "absolute z-[9999] mt-1 bg-surface shadow-lg rounded-md py-1 text-base border border-black/5 dark:border-gray-600/10 sm:text-sm overflow-hidden",
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

export interface MenuDropdownProps extends VariantProps<typeof menuDropdownStyles> {
  children: ReactNode;
  className?: string;
}

export function MenuDropdown({ children, className, placement, width }: MenuDropdownProps) {
  const { isOpen, menuListRef, menuId, handleListKeyDown } = useMenu();

  return (
    <Transition show={isOpen}>
      <div className={menuDropdownStyles({ placement, width, className })} onKeyDown={handleListKeyDown}>
        <ul ref={menuListRef} id={menuId} className="max-h-60 overflow-auto py-1" role="menu" tabIndex={-1}>
          {React.Children.map(children, (child, index) => {
            if (!React.isValidElement(child)) return null;

            const el = child as React.ReactElement<MenuItemProps>;

            return React.cloneElement(el, {
              index,
            });
          })}
        </ul>
      </div>
    </Transition>
  );
}
