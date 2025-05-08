"use client";

import cn from "@/lib/cn";
import { ReactNode } from "react";
import Transition, { TransitionType } from "../Transition";
import { useCollapse } from "./CollapseContext";

export interface CollapseContentProps {
  children: ReactNode;
  className?: string;
}

export function CollapseContent({ children, className }: CollapseContentProps) {
  const { isExpanded } = useCollapse();

  const transiton: TransitionType = {
    duration: 400,
    mount: "opacity-100 translate-y-0",
    unmount: "opacity-0 -translate-y-2",
  };

  return (
    <Transition show={isExpanded} {...transiton}>
      <div className={cn("p-4 dark:bg-gray-600/5 rounded-b-lg", className)}>{children}</div>
    </Transition>
  );
}
