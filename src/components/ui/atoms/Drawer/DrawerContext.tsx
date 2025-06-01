import { createContext, useContext } from "react";

export type DrawerContextType = {
  isOpen: boolean;
  drawerId: string;
  titleId: string;
  descriptionId: string;
  onClose: () => void;
};

export const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be called within a Drawer component");
  }
  return context;
};
