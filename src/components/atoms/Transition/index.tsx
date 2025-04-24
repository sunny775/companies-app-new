import cn from "@/lib/cn";
import { ReactNode, useEffect, useState } from "react";

export interface TransitionProps {
  show: boolean;
  duration?: number;
  children: ReactNode;
  mount?: string;
  unmount?: string;
  className?: string;
}

export default function Transition({
  show = false,
  children,
  duration = 300,
  className,
  mount = "opacity-100 translate-y-0",
  unmount = "opacity-0 translate-y-6",
}: TransitionProps) {
  const [shouldRender, setShouldRender] = useState(show);
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      // Need to delay setting mounted to true to allow the browser to apply the initial unmounted state
      const timer = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return shouldRender ? (
    <div
      style={{ transitionDuration: `${duration}ms` }}
      className={cn("transition-all ease-out", mounted ? mount : unmount, className)}
    >
      {children}
    </div>
  ) : null;
}

export function ExampleTransitionUsage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
      <button onClick={() => setOpen(!open)} className="px-4 py-2 bg-indigo-600 text-white rounded">
        Toggle Animation
      </button>

      <Transition show={open} duration={300}>
        <div className="bg-white shadow-lg rounded p-6 w-64 text-center">Hello! I fade and slide in/out.</div>
      </Transition>
    </div>
  );
}
