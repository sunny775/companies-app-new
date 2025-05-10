import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { ToastType } from "./ToastContext";

interface ProgressBarProps {
  duration: number;
  isRunning: boolean;
  type: ToastType;
}

const toastProgressBarStyles = tv({
  base: "h-1 w-full bg-opacity-10 absolute bottom-0",
  slots: {
    elapsed: "h-full bg-white/50 transition-all duration-100 ease-linear",
  },
  variants: {
    type: {
      default: "bg-gray-600/80",
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

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

  const styles = toastProgressBarStyles({ type });

  return (
    <div className={styles.base()}>
      <div className={styles.elapsed()} style={{ width: `${elapsed}%` }} />
    </div>
  );
};
