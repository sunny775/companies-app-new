"use client";

import cn from "@/lib/cn";
import { ReactNode, useId, useState } from "react";
import { CollapseContext } from "./CollapseContext";

export interface CollapseProps {
  defaultExpanded?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function CollapseRoot({ defaultExpanded, children, className, id }: CollapseProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);
  const defaultId = useId();
  const collapseId = `${id ?? defaultId}-collapse`;
  const contentId = `${collapseId}-content`;
  const triggerId = `${collapseId}-trigger`;

  const toggleExpanded = (): void => {
    setIsExpanded((prev) => !prev);
  };

  const value = { isExpanded, toggleExpanded, id: collapseId, contentId, triggerId };

  return (
    <CollapseContext.Provider value={value}>
      <div className={cn("overflow-hidden dark:bg-gray-600/5", { "rounded-lg shadow-md": isExpanded }, className)}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
}
