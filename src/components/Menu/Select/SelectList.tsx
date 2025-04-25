"use client";
import cn from "@/lib/cn";
import React, { ReactNode } from "react";
import { useSelect } from "./SelectContext";
import { SelectListItemProps } from "./SelectListItem";

export interface SelectListProps {
  children: ReactNode;
  className?: string;
}

export function SelectList({ className, children }: SelectListProps) {
  const { listboxRef, labelId, listboxId } = useSelect();

  return (
    <ul
      ref={listboxRef}
      id={listboxId}
      className={cn("max-h-60 overflow-auto py-1", className)}
      role="listbox"
      aria-labelledby={labelId}
      tabIndex={-1}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        const el = child as React.ReactElement<SelectListItemProps>;

        return React.cloneElement(el, {
          index,
        });
      })}
    </ul>
  );
}
