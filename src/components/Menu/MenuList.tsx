import React from "react";
import { useMenu } from "./Menu";
import cn from "@/lib/cn";

export function MenuList({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"ul">) {
  const { menuOpen, listRef } = useMenu();

  return (
    menuOpen && (
      <ul
        role="listbox"
        ref={listRef}
        className={cn(
          "absolute left-0 top-full z-10 mt-1 max-h-[20rem] max-w-[18rem] overflow-y-auto bg-surface-2 shadow-lg border border-gray-100 dark:border-white/1 rounded-md",
          className
        )}
        {...rest}
      >
        {children}
      </ul>
    )
  );
}
