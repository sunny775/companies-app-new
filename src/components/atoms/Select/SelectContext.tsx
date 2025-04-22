import React, { Dispatch, KeyboardEvent, ReactNode, RefObject, SetStateAction } from "react";

export type SelectContextType = contextValue;

export interface contextValue {
  id?: string;
  label?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>
  selectedOption: string | null;
  setSelectedOption: Dispatch<SetStateAction<string | null>>
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredOptions: string[];
  selectRef: RefObject<HTMLDivElement | null>;
  listboxRef: RefObject<HTMLUListElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  optionsRef: RefObject<(HTMLLIElement | null)[]>;
  labelId: string,
  listboxId: string;
  searchId: string;
  selectOption: (option: string) => void;
  handleListKeyDown: (e: KeyboardEvent) => void
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
