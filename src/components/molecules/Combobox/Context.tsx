import { Prettify } from "@/lib/shared-types";
import { UseFloatingReturn, UseInteractionsReturn } from "@floating-ui/react";
import React, { ReactNode } from "react";

export type ComboboxContextType = Prettify<ContextValue>;

export interface ContextValue extends UseInteractionsReturn, UseFloatingReturn<HTMLInputElement> {
  activeIndex?: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.RefObject<(HTMLElement | null)[]>;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (value: string | null) => void;
  listItems: string[];
  query: string;
  setQuery: (value: string) => void;
}

export interface ComboboxContextProviderProps {
  value: ContextValue;
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

export const ComboboxContextProvider = ({ value, children }: ComboboxContextProviderProps) => {
  return <ComboboxContext.Provider value={value}>{children}</ComboboxContext.Provider>;
};
