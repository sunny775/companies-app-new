import { createContext, useContext } from "react";

export interface TabsContextType {
  activeTab: string;
  handleTabChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be called within a Tabs Component");
  }
  return context;
}
