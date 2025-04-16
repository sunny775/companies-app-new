import { UseFloatingData, UseInteractionsReturn } from "@floating-ui/react";
import React, { ReactNode } from "react";

export type SelectContextType = contextValue;

export interface contextValue extends UseInteractionsReturn, UseFloatingData {
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.RefObject<(HTMLLIElement | null)[]>;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (value: string | null) => void;
  isTypingRef: React.RefObject<boolean>;
  handleSelect(index: number): void;
  listItems: string[];
}

export interface SelectContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const SelectContext = React.createContext<SelectContextType | null>(null);

export function useSelect() {
  const context = React.useContext(SelectContext);

  if (context === null) {
    throw new Error("useSelect() must be used within a Select.");
  }

  return context;
}

export const SelectContextProvider = ({ value, children }: SelectContextProviderProps) => {
  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
};
