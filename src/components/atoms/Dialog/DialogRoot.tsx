import useScrollLock from "@/lib/hooks/useScrollLock";
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { tv, type VariantProps } from "tailwind-variants";
import Transition, { TransitionType } from "../Transition";
import { DialogContext } from "./DialogContext";

export const dialogStyles = tv({
  base: [
    "relative bg-surface rounded-lg shadow-2xl text-gray-700 dark:text-gray-300 antialiased font-sans text-base font-light leading-relaxed",
    "outline-none p-0 m-auto fixed z-50",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "max-w-[90vw] overflow-hidden",
  ],
  variants: {
    size: {
      xs: "w-[calc(100%-24px)] md:w-3/5 lg:w-2/5 2xl:w-1/4 max-w-md",
      sm: "w-[calc(100%-24px)] md:w-2/3 lg:w-2/4 2xl:w-1/3 max-w-lg",
      md: "w-[calc(100%-24px)] md:w-3/4 lg:w-3/5 2xl:w-2/5 max-w-xl",
      lg: "w-[calc(100%-24px)] md:w-5/6 lg:w-3/4 2xl:w-3/5 max-w-2xl",
      xl: "w-[calc(100%-24px)] md:w-5/6 2xl:w-3/4 max-w-4xl",
      xxl: "w-[calc(100%-24px)] h-[calc(100%-24px)]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const dialogBackdropStyles = tv({
  base: "fixed inset-0 bg-black/10 backdrop-blur-sm z-40",
});

export interface AnimationProps extends TransitionType {
  backdropDuration?: number;
  backdropMount?: string;
  backdropUnmount?: string;
}

export interface DialogProps extends Omit<React.ComponentProps<"div">, "role">, VariantProps<typeof dialogStyles> {
  open: boolean;
  onClose: () => void;
  initialFocus?: React.RefObject<HTMLElement>;
  preventScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  animation?: AnimationProps;
}

export const DialogRoot = ({
  open,
  onClose,
  size,
  className,
  children,
  preventScroll = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  animation,
  ...rest
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const uniqueId = useId();
  const dialogId = `dialog-${uniqueId}`;
  const titleId = `dialog-title-${uniqueId}`;
  const descriptionId = `dialog-description-${uniqueId}`;

  const { lockScroll, unlockScroll } = useScrollLock();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (open && preventScroll) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

  const defaultAnimation: AnimationProps = useMemo(() => {
    return {
      duration: 400,
      backdropDuration: 500,
      mount: "opacity-100 scale-100",
      unmount: "opacity-0 scale-115",
      backdropMount: "opacity-100 backdrop-blur-sm",
      backdropUnmount: "opacity-0 backdrop-blur-none",
    };
  }, []);

  const animationProps = useMemo(
    () => ({
      ...defaultAnimation,
      ...animation,
    }),
    [animation, defaultAnimation]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!dialogRef.current) return;

      if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && closeOnOutsideClick) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, handleKeyDown, handleOutsideClick]);

  const contextValue = useMemo(
    () => ({
      open,
      onClose,
      dialogId,
      titleId,
      descriptionId,
    }),
    [open, onClose, dialogId, titleId, descriptionId]
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    <DialogContext.Provider value={contextValue}>
      {/* Backdrop with animation */}
      <Transition
        show={open}
        duration={animationProps.backdropDuration}
        mount={animationProps.backdropMount}
        unmount={animationProps.backdropUnmount}
        className={dialogBackdropStyles()}
      >
        <div className="w-full h-full" aria-hidden="true" />
      </Transition>

      {/* Dialog with animation */}
      <Transition
        show={open}
        duration={animationProps.duration}
        mount={animationProps.mount}
        unmount={animationProps.unmount}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          id={dialogId}
          className={dialogStyles({ size, className })}
          tabIndex={-1}
          {...rest}
        >
          {children}
        </div>
      </Transition>
    </DialogContext.Provider>,
    document.body
  );
};
