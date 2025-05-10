import React, { createContext } from "react";

export enum ToastPosition {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  TOP_CENTER = "top-center",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_CENTER = "bottom-center",
}

export enum ToastType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  DEFAULT = "default",
}

export interface ToastOptions {
  type?: ToastType;
  autoClose?: number | false;
  position?: ToastPosition;
}

export interface ToastItemType {
  id: string;
  content: React.ReactNode;
  type: ToastType;
  onClose: (id: string) => void;
  autoClose: number | false;
}

export interface ToastContextValue {
  toasts: ToastItemType[];
  addToast: (content: React.ReactNode, options?: ToastOptions) => string;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
