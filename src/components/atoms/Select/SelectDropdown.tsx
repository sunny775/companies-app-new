"use client";
import cn from "@/lib/cn";
import { ReactNode } from "react";
import Transition from "../Trsansition";
import { useSelect } from "./SelectContext";

export interface SelectDropdownProps {
  children: ReactNode;
  className?: string;
}

export function SelectDropdown({ children, className }: SelectDropdownProps) {
  const { isOpen, handleListKeyDown } = useSelect();

  return (
    <Transition show={isOpen}>
      <div
        className={cn(
          "absolute z-[999] mt-1 w-full bg-surface shadow-lg rounded-md py-1 text-base border border-black/5 dark:border-white/5 sm:text-sm",
          className
        )}
        onKeyDown={handleListKeyDown}
      >
        {children}
      </div>
    </Transition>
  );
}
