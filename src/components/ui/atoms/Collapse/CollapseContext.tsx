"use client";

import { createContext, useContext } from "react";

export interface CollapseContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
  id: string;
  contentId: string;
  triggerId: string;
}

export const CollapseContext = createContext<CollapseContextType | undefined>(undefined);

export function useCollapse() {
  const context = useContext(CollapseContext);
  if (context === undefined) {
    throw new Error("useCollapse must be used within a Collapse root Component");
  }
  return context;
}
