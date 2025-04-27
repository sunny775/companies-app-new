import cn from "@/lib/cn";
import React, { ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { tooltipStyles } from "./tootltip.styles";

type TooltipPosition = "top" | "bottom" | "left" | "right";

export type TooltipChildrenProps<T> = {
  onMouseEnter: React.MouseEventHandler<T>;
  onMouseLeave: React.MouseEventHandler<T>;
  ref: React.RefObject<T | null>;
};

export interface TooltipProps<T extends HTMLElement> {
  children: (props: TooltipChildrenProps<T>) => ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

interface Coordinates {
  x: number;
  y: number;
}

export default function Tooltip<T extends HTMLElement>({
  children,
  content,
  position = "top",
  className,
}: TooltipProps<T>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });
  const triggerRef = useRef<T>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const isInitialPositionSet = useRef<boolean>(false);

  const id = useId();

  const updatePosition = useCallback((): void => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newX: number, newY: number;

    switch (position) {
      case "top":
        newX = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        newY = triggerRect.top - tooltipRect.height - 8;
        break;
      case "bottom":
        newX = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        newY = triggerRect.bottom + 8;
        break;
      case "left":
        newX = triggerRect.left - tooltipRect.width - 8;
        newY = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right":
        newX = triggerRect.right + 8;
        newY = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      default:
        newX = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        newY = triggerRect.top - tooltipRect.height - 8;
    }

    // Adjust for screen boundaries
    if (newX < 10) newX = 10;
    if (newX + tooltipRect.width > windowWidth - 10) newX = windowWidth - tooltipRect.width - 10;
    if (newY < 10) newY = 10;
    if (newY + tooltipRect.height > windowHeight - 10) newY = windowHeight - tooltipRect.height - 10;

    setCoords({ x: newX, y: newY });
    isInitialPositionSet.current = true;
  }, [position]);

  const onMouseEnter = (): void => {
    setIsVisible(true);
  };

  const onMouseLeave = (): void => {
    setIsVisible(false);
    isInitialPositionSet.current = false;
  };

  useEffect(() => {
    if (tooltipRef.current && isVisible) {
      updatePosition();
    }
  }, [updatePosition, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isVisible, updatePosition]);

  const styles = tooltipStyles({ position });

  const triggerElement = children({ onMouseEnter, onMouseLeave, ref: triggerRef });

  return (
    <>
      {triggerElement}
      {isVisible ? (
        <div
          ref={tooltipRef}
          id={id}
          role="tooltip"
          className={cn("fixed z-50 w-40", className)}
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            pointerEvents: "none",
            opacity: isInitialPositionSet.current ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
        >
          <div className="relative">
            <div className={styles.base()}>{content}</div>
            <div className={styles.arrow()} aria-hidden="true"></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
