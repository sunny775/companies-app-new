import cn from "@/lib/utils/cn";
import React, { CSSProperties, ElementType, memo, ReactNode, useEffect, useRef, useState } from "react";

export interface TransitionType {
  duration?: number;
  mount?: string;
  unmount?: string;
}

export interface TransitionProps extends TransitionType {
  show: boolean;
  children: ReactNode;
  className?: string;
  as?: ElementType;
  onTransitionEnd?: () => void;
}

const Transition = memo(
  ({
    show = false,
    children,
    duration = 300,
    className,
    mount = "opacity-100 translate-y-0",
    unmount = "opacity-0 translate-y-6",
    as = "div",
    onTransitionEnd,
  }: TransitionProps) => {
    const [shouldRender, setShouldRender] = useState(show);
    const [mounted, setMounted] = useState(show);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const componentRef = useRef<HTMLElement>(null);

    useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (show) {
        setShouldRender(true);
        // Need to delay setting mounted to true to allow the browser to apply the initial unmounted state
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setMounted(true);
        }, 50);
      } else {
        setMounted(false);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setShouldRender(false);
          onTransitionEnd?.();
        }, duration);
      }
    }, [show, duration, onTransitionEnd]);

    if (!shouldRender) {
      return null;
    }

    return React.createElement(
      as || "div",
      {
        ref: componentRef,
        className,
      },
      React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        const el = child as React.ReactElement<{ "data-mount": boolean; className?: string; style?: CSSProperties }>;

        const { className, style, ...rest } = el.props;

        return React.cloneElement(el, {
          ...rest,
          key: index,
          "data-mount": mounted,
          style: {
            transitionDuration: `${duration}ms`,
            ...style,
          },
          className: cn("transition-all ease-in-out", mounted ? mount : unmount, className),
        });
      })
    );
  }
);

Transition.displayName = "Transition Component";

export default Transition;
