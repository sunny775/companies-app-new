import { createContext, useContext } from "react";

export type DialogContextType = {
  open: boolean;
  dialogId: string;
  titleId: string;
  descriptionId: string;
  onClose: () => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be called within a Dialog component");
  }
  return context;
};
