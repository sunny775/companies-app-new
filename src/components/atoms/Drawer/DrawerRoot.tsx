import useScrollLock from "@/lib/hooks/useScrollLock";
import React, { ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { tv, type VariantProps } from "tailwind-variants";
import Transition from "../Transition";
import { DrawerContext } from "./DrawerContext";

export const drawerStyles = tv({
  base: [
    "h-screen w-full fixed bg-surface shadow-xl transform transition-transform text-gray-700 dark:text-gray-300",
    "flex flex-col overflow-hidden z-50",
  ],
  variants: {
    position: {
      left: "left-0 top-0",
      right: "right-0 top-0",
    },
    size: {
      xs: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    position: "right",
    size: "md",
  },
});

export const drawerBackdropStyles = tv({
  base: "fixed inset-0 bg-black/10 backdrop-blur-sm z-40",
});

export interface AnimationProps {
  duration?: number;
  backdropDuration?: number;
  mount?: string;
  unmount?: string;
  backdropMount?: string;
  backdropUnmount?: string;
}

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerStyles> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  preventScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  animation?: AnimationProps;
  description?: string;
  title?: string;
}

export const DrawerRoot = ({
  isOpen,
  onClose,
  children,
  position = "right",
  size = "md",
  className,
  preventScroll = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  animation,
  description,
  title,
  ...rest
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const uniqueId = useId();
  const drawerId = `drawer-${uniqueId}`;
  const titleId = `drawer-title-${uniqueId}`;
  const descriptionId = `drawer-description-${uniqueId}`;

  const { lockScroll, unlockScroll } = useScrollLock();
  const [mounted, setMounted] = useState(false);

  const transformStyles = useMemo(() => {
    switch (position) {
      case "left":
        return { mount: "translate-x-0", unmount: "-translate-x-full" };
      case "right":
        return { mount: "translate-x-0", unmount: "translate-x-full" };
      default:
        return { mount: "translate-x-0", unmount: "translate-x-full" };
    }
  }, [position]);

  const defaultAnimation: AnimationProps = useMemo(() => {
    return {
      duration: 300,
      backdropDuration: 300,
      mount: transformStyles.mount,
      unmount: transformStyles.unmount,
      backdropMount: "opacity-100 backdrop-blur-md",
      backdropUnmount: "opacity-0 backdrop-blur-none",
    };
  }, [transformStyles]);

  const animationProps = useMemo(
    () => ({
      ...defaultAnimation,
      ...animation,
    }),
    [animation, defaultAnimation]
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen && preventScroll) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnOutsideClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      onClose,
      drawerId,
      titleId,
      descriptionId,
    }),
    [isOpen, onClose, drawerId, titleId, descriptionId]
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    <DrawerContext.Provider value={contextValue}>
      <Transition
        show={isOpen}
        duration={animationProps.backdropDuration}
        mount={animationProps.backdropMount}
        unmount={animationProps.backdropUnmount}
        className={drawerBackdropStyles()}
      >
        <div className="w-full h-full" aria-hidden="true" />
      </Transition>

      <Transition
        show={isOpen}
        duration={animationProps.duration}
        mount={animationProps.mount}
        unmount={animationProps.unmount}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <div className="w-full h-full pointer-events-auto" onClick={handleBackdropClick}>
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            id={drawerId}
            className={drawerStyles({ position, size, className })}
            tabIndex={-1}
            // Stop propagation to prevent closing when clicking inside drawer
            onClick={(e) => e.stopPropagation()}
            {...rest}
          >
            {children}
          </div>
        </div>
      </Transition>
    </DrawerContext.Provider>,
    document.body
  );
};
