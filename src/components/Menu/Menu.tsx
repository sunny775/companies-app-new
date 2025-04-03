import cn from "@/lib/cn";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type contextValue = {
  menuOpen: boolean;
  selectedIndex: number;
  focusedIndex: number | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
  listRef: React.RefObject<HTMLUListElement | null>;
  openMenu: (value: React.SetStateAction<boolean>) => void;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export interface MenuContextProviderProps {
  value: contextValue;
  children: ReactNode;
}

export const MenuContext = React.createContext<null | contextValue>(null);

export function useMenu() {
  const context = React.useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu() must be used within a Menu");
  }

  return context;
}

export const MenuContextProvider = ({
  value,
  children,
}: MenuContextProviderProps) => {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export function Menu({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("fromMenu:", menuOpen);

  return (
    <MenuContextProvider
      value={{
        menuOpen,
        menuRef,
        listRef,
        openMenu: setMenuOpen,
        selectedIndex,
        focusedIndex,
        setSelectedIndex,
        setFocusedIndex,
      }}
    >
      <div
        className={cn("relative flex w-full", className)}
        {...rest}
        ref={menuRef}
      >
        {children}
      </div>
    </MenuContextProvider>
  );
}
