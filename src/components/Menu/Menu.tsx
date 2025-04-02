import cn from "@/lib/cn";
import React, { useState, useEffect, useRef, ReactNode } from "react";

type contextValue = {
  menuOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  openMenu: (value: React.SetStateAction<boolean>) => void;
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <MenuContextProvider value={{ menuOpen, menuRef, openMenu: setMenuOpen }}>
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
