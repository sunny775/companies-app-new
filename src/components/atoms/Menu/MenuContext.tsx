import React, { ReactNode, Ref, RefObject } from "react";
import { Strategy, FloatingContext, ReferenceType, FloatingTreeType, UseInteractionsReturn } from "@floating-ui/react";
import type { Variant } from "framer-motion";

export type Animation = {
  initial?: Variant;
  mount?: Variant;
  unmount?: Variant;
};

export type OffsetType =
  | number
  | {
      mainAxis?: number;
      crossAxis?: number;
      alignmentAxis?: number | null;
    };

export type ExtendedUserProps = {
  active?: boolean;
  selected?: boolean;
};

export type contextValue = {
  open: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
  setInternalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  strategy: Strategy;
  x: number;
  y: number;
  reference: (instance: HTMLButtonElement | null) => void;
  floating: Ref<HTMLElement | null>;
  listItemsRef: RefObject<(HTMLElement | null)[]>;
  appliedAnimation?: Animation;
  lockScroll?: boolean;
  context: FloatingContext<ReferenceType>;
  tree: FloatingTreeType<ReferenceType> | null;
  allowHover?: boolean;
  internalAllowHover: boolean;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  nested: boolean;
} & UseInteractionsReturn;

export interface MenuContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const MenuContext = React.createContext<null | contextValue>(null);

export function useMenu() {
  const context = React.useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu() must be used within a Menu.");
  }

  return context;
}

export const MenuContextProvider = ({ value, children }: MenuContextProviderProps) => {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
