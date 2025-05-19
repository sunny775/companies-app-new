"use client";

import { useContext } from "react";
import { ToastContext, ToastOptions, ToastType } from "./ToastContext";

export interface ToastApi {
  toast: (content: React.ReactNode, options?: ToastOptions) => string;
  success: (content: React.ReactNode, options?: ToastOptions) => string;
  error: (content: React.ReactNode, options?: ToastOptions) => string;
  info: (content: React.ReactNode, options?: ToastOptions) => string;
  warning: (content: React.ReactNode, options?: ToastOptions) => string;
  dismiss: (id: string) => void;
}

export const useToast = (): ToastApi => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { addToast, removeToast } = context;

  return {
    toast: (content, options) => addToast(content, options),
    success: (content, options) => addToast(content, { ...options, type: ToastType.SUCCESS }),
    error: (content, options) => addToast(content, { ...options, type: ToastType.ERROR }),
    info: (content, options) => addToast(content, { ...options, type: ToastType.INFO }),
    warning: (content, options) => addToast(content, { ...options, type: ToastType.WARNING }),
    dismiss: removeToast,
  };
};
