"use client";

import cn from "@/lib/utils/cn";

export interface MenuDividerProps {
  className?: string;
}

export function MenuDivider({ className }: MenuDividerProps) {
  return <li role="separator" className={cn("my-1 h-px bg-gray-600/20", className)} />;
}
