"use client";

import cn from "@/lib/cn";
import { ReactNode, useState } from "react";
import { CollapseContext } from "./CollapseContext";

export interface CollapseProps {
  defaultExpanded?: boolean;
  children: ReactNode;
  className?: string;
}

export function CollapseRoot({ defaultExpanded, children, className }: CollapseProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);

  const toggleExpanded = (): void => {
    setIsExpanded((prev) => !prev);
  };

  const value = { isExpanded, toggleExpanded };

  return (
    <CollapseContext.Provider value={value}>
      <div className={cn("rounded-lg shadow-md", className)}>{children}</div>
    </CollapseContext.Provider>
  );
}
