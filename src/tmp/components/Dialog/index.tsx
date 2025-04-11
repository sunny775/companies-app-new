import React from "react";
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  useMergeRefs,
} from "@floating-ui/react";
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import merge from "deepmerge";
// import type { NewAnimatePresenceProps } from "../../types/generic";

import { DialogHeader, DialogHeaderProps } from "./DialogHeader";
import { DialogBody, DialogBodyProps } from "./DialogBody";
import { DialogFooter, DialogFooterProps } from "./DialogFooter";
import { tv, VariantProps } from "tailwind-variants";
import type { UseDismissProps } from "@floating-ui/react";
import { Animation } from "../sharedTypes";

export const dialogStyles = tv({
  base: "relative bg-white m-4 rounded-lg shadow-2xl text-blue-gray-500 antialiased font-sans text-base font-light leading-relaxed",
  slots: {
    backdrop: "grid place-items-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm",
  },
  variants: {
    size: {
      xs: "w-full md:w-3/5 lg:w-2/5 2xl:w-1/4 min-w-[80%] md:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[25%] max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[25%]",
      sm: "w-full md:w-2/3 lg:w-2/4 2xl:w-1/3 min-w-[80%] md:min-w-[66.666667%] lg:min-w-[50%] 2xl:min-w-[33.333333%] max-w-[80%] md:max-w-[66.666667%] lg:max-w-[50%] 2xl:max-w-[33.333333%]",
      md: "w-full md:w-3/4 lg:w-3/5 2xl:w-2/5 min-w-[90%] md:min-w-[75%] lg:min-w-[60%] 2xl:min-w-[40%] max-w-[90%] md:max-w-[75%] lg:max-w-[60%] 2xl:max-w-[40%]",
      lg: "w-full md:w-5/6 lg:w-3/4 2xl:w-3/5 min-w-[90%] md:min-w-[83.333333%] lg:min-w-[75%] 2xl:min-w-[60%] max-w-[90%] md:max-w-[83.333333%] lg:max-w-[75%] 2xl:max-w-[60%]",
      xl: "w-full md:w-5/6 2xl:w-3/4 min-w-[95%] md:min-w-[83.333333%] 2xl:min-w-[75%] max-w-[95%] md:max-w-[83.333333%] 2xl:max-w-[75%]",
      xxl: "flex flex-col w-screen min-w-[100vw] max-w-[100vw] h-screen min-h-[100vh] max-h-[100vh] m-0 rounded-none",
    },
  },
});

export interface DialogProps extends React.ComponentProps<"div">, VariantProps<typeof dialogStyles> {
  open: boolean;
  handler: (value: unknown) => void;
  dismiss?: UseDismissProps;
  animate?: Animation;
}

const Dialog = ({ open, handler, size, dismiss, animate, className, children, ref, ...rest }: DialogProps) => {
  const styles = dialogStyles({ className, size });
  const containerClasses = styles.base();

  dismiss = dismiss ?? {};
  animate = animate ?? {
    unmount: {},
    mount: {},
  };

  const animation = {
    unmount: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
    mount: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  const backdropAnimation = {
    unmount: {
      opacity: 0,
      transition: {
        delay: 0.2,
      },
    },
    mount: {
      opacity: 1,
    },
  };
  const appliedAnimation = merge(animation, animate);

  const { context, refs } = useFloating({
    open,
    onOpenChange: handler,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getFloatingProps } = useInteractions([useClick(context), useRole(context), useDismiss(context, dismiss)]);

  const mergedRef = useMergeRefs([ref, refs.floating]);

  // const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

  return (
    <LazyMotion features={domAnimation}>
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay
              style={{
                zIndex: 9999,
              }}
              lockScroll
            >
              <FloatingFocusManager context={context}>
                <m.div
                  className={size === "xxl" ? "" : styles.backdrop()}
                  initial="unmount"
                  exit="unmount"
                  animate={open ? "mount" : "unmount"}
                  variants={backdropAnimation}
                  transition={{ duration: 0.2 }}
                >
                  <m.div
                    {...getFloatingProps({
                      ...rest,
                      ref: mergedRef,
                      className: containerClasses,
                      "aria-labelledby": labelId,
                      "aria-describedby": descriptionId,
                    })}
                    initial="unmount"
                    exit="unmount"
                    animate={open ? "mount" : "unmount"}
                    variants={appliedAnimation}
                  >
                    {children}
                  </m.div>
                </m.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </LazyMotion>
  );
};

export type { DialogHeaderProps, DialogBodyProps, DialogFooterProps };
export { Dialog, DialogHeader, DialogBody, DialogFooter };
export default Object.assign(Dialog, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});
