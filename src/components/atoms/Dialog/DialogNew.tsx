import useScrollLock from "@/lib/hooks/useScrollLock";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { tv, type VariantProps } from "tailwind-variants";
import Transition from "../Trsansition";

// Create context for dialog state and management
type DialogContextType = {
  open: boolean;
  dialogId: string;
  titleId: string;
  descriptionId: string;
  onClose: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within a Dialog component");
  }
  return context;
};

// Main Dialog component styles
export const dialogStyles = tv({
  base: [
    "relative bg-surface rounded-lg shadow-2xl text-gray-700 dark:text-gray-300 antialiased font-sans text-base font-light leading-relaxed",
    "outline-none p-0 m-auto fixed z-50",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", // Center positioning
    "max-h-[90vh] max-w-[90vw] overflow-auto", // Prevent overflow
  ],
  variants: {
    size: {
      xs: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4 max-w-md",
      sm: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3 max-w-lg",
      md: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5 max-w-xl",
      lg: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5 max-w-2xl",
      xl: "w-full md:w-5/6 2xl:w-3/4 max-w-4xl",
      xxl: "w-screen h-screen m-0 rounded-none",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const dialogHeaderStyles = tv({
  base: "flex items-center shrink-0 p-4  antialiased font-sans text-2xl font-semibold leading-snug",
});

export const dialogBodyStyles = tv({
  base: "relative p-4  antialiased font-sans text-base font-light leading-relaxed",
  variants: {
    divider: {
      true: "border-t border-t-gray-100 border-b border-b-gray-100",
    },
  },
  defaultVariants: {
    divider: false,
  },
});

export const dialogFooterStyles = tv({
  base: "flex items-center justify-end shrink-0 flex-wrap p-4",
});

export const dialogBackdropStyles = tv({
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

export interface DialogProps extends Omit<React.ComponentProps<"div">, "role">, VariantProps<typeof dialogStyles> {
  open: boolean;
  onClose: () => void;
  initialFocus?: React.RefObject<HTMLElement>;
  preventScroll?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  animation?: AnimationProps;
}

export type DialogHeaderProps = React.ComponentProps<"div">;
export type DialogBodyProps = React.ComponentProps<"div"> & VariantProps<typeof dialogBodyStyles>;
export type DialogFooterProps = React.ComponentProps<"div">;

// Dialog Header Component
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(({ className, children, ...rest }, ref) => {
  const { titleId } = useDialogContext();
  return (
    <div {...rest} ref={ref} className={dialogHeaderStyles({ className })} id={titleId}>
      {children}
    </div>
  );
});
DialogHeader.displayName = "DialogHeader";

// Dialog Body Component
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ divider, className, children, ...rest }, ref) => {
    const { descriptionId } = useDialogContext();
    return (
      <div {...rest} ref={ref} className={dialogBodyStyles({ className, divider })} id={descriptionId}>
        {children}
      </div>
    );
  }
);
DialogBody.displayName = "DialogBody";

// Dialog Footer Component
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({ className, children, ...rest }, ref) => {
  return (
    <div {...rest} ref={ref} className={dialogFooterStyles({ className })}>
      {children}
    </div>
  );
});
DialogFooter.displayName = "DialogFooter";

// Main Dialog Component
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
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
    },
    ref
  ) => {
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
        duration: 500,
        backdropDuration: 500,
        mount: "opacity-100 scale-100",
        unmount: "opacity-0 scale-90",
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
  }
);

Dialog.displayName = "Dialog";

// Create compound component
const DialogComponent = Object.assign(Dialog, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export default DialogComponent;
