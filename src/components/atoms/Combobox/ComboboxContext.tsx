import React, { ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { ContextData, UseInteractionsReturn } from "@floating-ui/react";

export type SelectContextType = contextValue;

export type contextValue = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  activeIndex?: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.RefObject<Array<HTMLLIElement | null>> | null;
  setOpen: (open: boolean) => void;
  onChange: (value: string | null) => void;
  getItemProps: & UseInteractionsReturn["getItemProps"]
  dataRef: ContextData;
};

export interface SelectContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const SelectContext = React.createContext<SelectContextType | null>(null);

export function useSelect() {
  const context = React.useContext(SelectContext);

  if (context === null) {
    throw new Error(
      "useSelect() must be used within a Select.",
    );
  }

  return context;
}

export function usePrevious<T>(value: T) {
  const ref = React.useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const SelectContextProvider = ({ value, children }: SelectContextProviderProps) => {
  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
};
