"use client";
import cn from "@/lib/cn";
import { ReactNode } from "react";
import Transition from "../Transition";
import { useSelect } from "./SelectContext";

export interface SelectDropdownProps {
  children: ReactNode;
  className?: string;
}

export function SelectDropdown({ children, className }: SelectDropdownProps) {
  const { isOpen } = useSelect();

  return (
    <Transition show={isOpen}>
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 z-[999] w-full bg-surface shadow-lg rounded-md py-1 text-base border border-gray-600/10 sm:text-sm",
          className
        )}
       
      >
        {children}
      </div>
    </Transition>
  );
}
