import React, { ComponentProps } from "react";
import cn from "@/lib/cn";

export function MenuItem({
  children,
  className,
  ...rest
}: ComponentProps<"li">) {
  return (
    <li
      tabIndex={0}
      className={cn(
        `flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-green-600/10`,
        className
      )}
      {...rest}
    >
      {children}
    </li>
  );
}
