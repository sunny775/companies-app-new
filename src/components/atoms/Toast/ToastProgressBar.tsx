import { useEffect, useState } from "react";
import { ToastType } from "./ToastContext";


interface ProgressBarProps {
  duration: number;
  isRunning: boolean;
  type: ToastType;
}

export const ProgressBar = ({ duration, isRunning, type }: ProgressBarProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning || duration === 0) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const elapsedPercent = (elapsedTime / duration) * 100;

      setElapsed(elapsedPercent);

      if (elapsedPercent >= 100) {
        clearInterval(timer);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [isRunning, duration]);

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
    <div className={`h-1 w-full ${getTypeClass()} bg-opacity-10 absolute bottom-0`}>
      <div className={`h-full bg-white/50 transition-all duration-100 ease-linear`} style={{ width: `${elapsed}%` }} />
    </div>
  );
};
