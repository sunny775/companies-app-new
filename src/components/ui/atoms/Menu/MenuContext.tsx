"use client";

import { Prettify } from "@/lib/shared-types";
import React, { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

export type MenuContextType = Prettify<contextValue>;

export interface contextValue {
  id?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  focusedIndex: number;
  setFocusedIndex: Dispatch<SetStateAction<number>>;
  menuRef: RefObject<HTMLDivElement | null>;
  menuListRef: RefObject<HTMLUListElement | null>;
  itemsRef: RefObject<(HTMLLIElement | null)[]>;
  menuId: string;
  closeMenu: () => void;
  closeOnItemClick?: boolean;
}

export interface MenuContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const MenuContext = React.createContext<MenuContextType | null>(null);

export function useMenu() {
  const context = React.useContext(MenuContext);

  if (context === null) {
    throw new Error("useMenu() must be used within a Menu component.");
  }

  return context;
}

export const MenuContextProvider = ({ value, children }: MenuContextProviderProps) => {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
