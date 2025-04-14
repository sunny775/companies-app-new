import React, { ComponentProps, RefObject } from "react";
import { AnimatePresence, m, useAnimation, domAnimation, LazyMotion } from "framer-motion";
import type { UseDismissProps } from "@floating-ui/react";
import type { Transition } from "framer-motion";
import { useFloating, useInteractions, useDismiss } from "@floating-ui/react";
import { tv, VariantProps } from "tailwind-variants";

export interface DrawerProps extends ComponentProps<"div">, VariantProps<typeof drawerStyles> {
  open: boolean;
  size?: number;
  overlay?: boolean;
  overlayProps?: ComponentProps<"div">;
  onClose?: () => void;
  dismiss?: UseDismissProps;
  transition?: Transition;
  overlayRef?: RefObject<HTMLDivElement>;
}

export const drawerStyles = tv({
  base: "flex items-center shrink-0 p-4 text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug",
  slots: {
    overlay: "fixed z-[9999] pointer-events-auto bg-black/10 box-border w-full shadow-2xl shadow-blue-gray-900/10",
  },
  variants: {
    placement: {
      right: "top-0 right-0",
      bottom: "bottom-0 left-0",
      top: "top-0 left-0",
      left: "top-0 left-0",
    },
  },
  defaultVariants: {
    placement: "left",
  },
});

export const Drawer = ({
  open,
  size = 300,
  overlay = true,
  children,
  placement,
  overlayProps,
  className,
  onClose,
  dismiss,
  transition,
  overlayRef,
  ref,
  ...rest
}: DrawerProps) => {
  const constrols = useAnimation();

  const styles = drawerStyles({ placement, className });

  transition = transition ?? {
    type: "tween",
    duration: 0.3,
  };

  // const drawerClasses = styles.base({ className });
  const drawerClasses = styles.base();
  const overlayClasses = styles.overlay({ className: overlayProps?.className });

  const { context } = useFloating({
    open,
    onOpenChange: onClose,
  });

  const { getFloatingProps } = useInteractions([useDismiss(context, dismiss)]);

  React.useEffect(() => {
    constrols.start(open ? "open" : "close");
  }, [open, constrols, placement]);

  const drawerAnimation = {
    open: {
      x: 0,
      y: 0,
    },
    close: {
      x: placement === "left" ? -size : placement === "right" ? size : 0,
      y: placement === "top" ? -size : placement === "bottom" ? size : 0,
    },
  };

  const backdropAnimation = {
    unmount: {
      opacity: 0,
      transition: {
        delay: 0.3,
      },
    },
    mount: {
      opacity: 1,
    },
  };

  return (
    <React.Fragment>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {overlay && open && (
            <m.div
              ref={overlayRef}
              className={overlayClasses}
              initial="unmount"
              exit="unmount"
              animate={open ? "mount" : "unmount"}
              variants={backdropAnimation}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <m.div
          {...getFloatingProps({
            ref,
            ...rest,
          })}
          className={drawerClasses}
          style={{
            maxWidth: placement === "left" || placement === "right" ? size : "100%",
            maxHeight: placement === "top" || placement === "bottom" ? size : "100%",
            height: placement === "left" || placement === "right" ? "100vh" : "100%",
          }}
          initial="close"
          animate={constrols}
          variants={drawerAnimation}
          transition={transition}
        >
          {children}
        </m.div>
      </LazyMotion>
    </React.Fragment>
  );
};

export default Drawer;
