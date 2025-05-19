"use client";

import { AlertTriangle, Bell, CheckCircle, Info, X, XCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { ToastItemType, ToastType } from "./ToastContext";
import { ProgressBar } from "./ToastProgressBar";

const ToastIcon = ({ type }: { type: ToastType }): React.ReactNode => {
  const iconProps = {
    className: "mr-3 flex-shrink-0 text-gray-100",
    size: 20,
    strokeWidth: 2,
  };

  switch (type) {
    case ToastType.SUCCESS:
      return <CheckCircle {...iconProps} />;
    case ToastType.ERROR:
      return <XCircle {...iconProps} />;
    case ToastType.WARNING:
      return <AlertTriangle {...iconProps} />;
    case ToastType.INFO:
      return <Info {...iconProps} />;
    default:
      return <Bell {...iconProps} />;
  }
};

const ANIMATION_DURATION = 300;

type ToastProps = ToastItemType;

const toastStyles = tv({
  base: "relative flex flex-col mb-3 rounded-md overflow-hidden shadow-lg text-white max-w-md w-full",
  slots: {
    content: "flex items-center w-full p-4",
    closeBtn: "ml-4 text-gray-100 hover:text-white cursor-pointer",
  },
  variants: {
    type: {
      default: "bg-gray-600/80",
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    },
    isExiting: {
      true: "animate-fade-out",
      false: "animate-fade-in",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export const Toast = ({ id, content, type, onClose, autoClose }: ToastProps) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleClose = useCallback((): void => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, ANIMATION_DURATION);
  }, [id, onClose]);

  useEffect(() => {
    if (autoClose !== false) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, handleClose]);

  const styles = toastStyles({ type, isExiting });

  return (
    <div className={styles.base()} role="alert">
      <div className={styles.content()}>
        <ToastIcon type={type} />
        <div className="flex-grow">{content}</div>
        <button onClick={handleClose} className={styles.closeBtn()}>
          <X size={12} />
        </button>
      </div>

      {autoClose !== false && <ProgressBar duration={autoClose} isRunning={!isExiting} type={type} />}
    </div>
  );
};
