import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";
import { ToastContext, ToastContextValue, ToastItemType, ToastOptions, ToastPosition, ToastType } from "./ToastContext";

interface ToastContainerProps {
  position?: ToastPosition;
  children: ReactNode;
}

const DEFAULT_DELAY = 5000;

export const ToastProvider = ({ position = ToastPosition.TOP_RIGHT, children }: ToastContainerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const getPositionClass = (): string => {
    switch (position) {
      case ToastPosition.TOP_LEFT:
        return "top-4 left-4";
      case ToastPosition.TOP_CENTER:
        return "top-4 left-1/2 transform -translate-x-1/2";
      case ToastPosition.TOP_RIGHT:
        return "top-4 right-4";
      case ToastPosition.BOTTOM_LEFT:
        return "bottom-4 left-4";
      case ToastPosition.BOTTOM_CENTER:
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case ToastPosition.BOTTOM_RIGHT:
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  const removeToast = (id: string): void => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const addToast = (content: React.ReactNode, options: ToastOptions = {}): string => {
    const id = Date.now().toString();
    const toast: ToastItemType = {
      id,
      content,
      type: options.type || ToastType.DEFAULT,
      onClose: removeToast,
      autoClose: options.autoClose !== false ? options.autoClose || DEFAULT_DELAY : false,
    };

    setToasts((currentToasts) => [toast, ...currentToasts]);
    return id;
  };

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
  };

  if (!mounted) {
    return null;
  }

  const toastContainer = createPortal(
    <div className={`fixed z-50 flex flex-col ${getPositionClass()}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          content={toast.content}
          type={toast.type}
          onClose={toast.onClose}
          autoClose={toast.autoClose}
        />
      ))}
    </div>,
    document.body
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toastContainer}
    </ToastContext.Provider>
  );
};
