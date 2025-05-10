import { AlertTriangle, Bell, CheckCircle, Info, X, XCircle } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ToastItemType, ToastType } from "./ToastContext";
import { ProgressBar } from "./ToastProgressBar";

const ANIMATION_DURATION = 300;

type ToastProps = ToastItemType;

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

  const getTypeClass = (): string => {
    switch (type) {
      case ToastType.SUCCESS:
        return "bg-green-500";
      case ToastType.ERROR:
        return "bg-red-500";
      case ToastType.WARNING:
        return "bg-yellow-500";
      case ToastType.INFO:
        return "bg-blue-500";
      default:
        return "bg-gray-600/80";
    }
  };

  return (
    <div
      className={`relative flex flex-col mb-3 rounded-md overflow-hidden shadow-lg text-white max-w-md w-full 
        ${getTypeClass()} 
        ${isExiting ? "animate-fade-out" : "animate-fade-in"}`}
      role="alert"
    >
      <div className="flex items-center w-full p-4">
        <ToastIcon type={type} />
        <div className="flex-grow">{content}</div>
        <button onClick={handleClose} className="ml-4 text-white hover:text-gray-200" aria-label="Close">
          <X size={12} />
        </button>
      </div>

      {autoClose !== false && <ProgressBar duration={autoClose} isRunning={!isExiting} type={type} />}
    </div>
  );
};

const ToastIcon = ({ type }: { type: ToastType }): React.ReactNode => {
  const iconProps = {
    className: "mr-3 flex-shrink-0",
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
