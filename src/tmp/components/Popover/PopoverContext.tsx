import React, { ReactNode, RefObject } from "react";
import type { FloatingContext, ReferenceType, Strategy, UseInteractionsReturn } from "@floating-ui/react";
import { Animation } from "../sharedTypes";

export type contextValue = {
  open: boolean;
  strategy: Strategy;
  x?: number;
  y?: number;
  context: FloatingContext<ReferenceType>;
  reference: RefObject<ReferenceType | null>;
  floating: RefObject<HTMLElement | null>;
  appliedAnimation: Animation;
  labelId: string;
  descriptionId: string;
} & UseInteractionsReturn;

export interface PopoverContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const PopoverContext = React.createContext<contextValue | null>(null);

export function usePopover() {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error("usePopover() must be used within a Popover.");
  }

  return context;
}

export const PopoverContextProvider = ({ value, children }: PopoverContextProviderProps) => {
  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};
