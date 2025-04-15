import { ContextData, UseInteractionsReturn } from "@floating-ui/react";
import { useIsomorphicLayoutEffect } from "framer-motion";
import React, { ReactNode } from "react";

export type ComboboxContextType = contextValue;

export type contextValue = {
  activeIndex?: number | null;
  setActiveIndex: (index: number | null) => void;
  setInputValue: (value: string) => void;
  listRef: React.RefObject<(HTMLElement | null)[]>;
  setOpen: (open: boolean) => void;
  onSelect: (value: string | null) => void;
  getItemProps: UseInteractionsReturn["getItemProps"];
  dataRef: ContextData;
  domReference: React.RefObject<HTMLInputElement | null>;
};

export interface ComboboxContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const ComboboxContext = React.createContext<ComboboxContextType | null>(null);

export function useCombobox() {
  const context = React.useContext(ComboboxContext);

  if (context === null) {
    throw new Error("useCombobox() must be used within a Combobox.");
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

export const ComboboxContextProvider = ({ value, children }: ComboboxContextProviderProps) => {
  return <ComboboxContext.Provider value={value}>{children}</ComboboxContext.Provider>;
};
