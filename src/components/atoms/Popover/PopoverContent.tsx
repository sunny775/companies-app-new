import React from "react";
import { FloatingPortal, FloatingFocusManager, useMergeRefs } from "@floating-ui/react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { usePopover } from "./PopoverContext";
import { tv } from "tailwind-variants";

export type PopoverContentProps = React.ComponentProps<"div">

const popoverStyles = tv({
  base: "bg-white p-4 border border-blue-gray-50 rounded-lg shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none break-words whitespace-normal",
});

export const PopoverContent = 
  ({ children, className, ref, ...rest }: PopoverContentProps) => {
    const styles = popoverStyles({ className });
    const { open, strategy, x, y, context, floating, getFloatingProps, appliedAnimation, labelId, descriptionId } =
      usePopover();

    const mergedRef = useMergeRefs([ref, floating]);

    return (
      <LazyMotion features={domAnimation}>
        <FloatingPortal>
          <AnimatePresence>
            {open && (
              <FloatingFocusManager context={context}>
                <m.div
                  {...getFloatingProps({
                    ...rest,
                    ref: mergedRef,
                    className: styles,
                    style: {
                      position: strategy,
                      top: y ?? "",
                      left: x ?? "",
                    },
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
              </FloatingFocusManager>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </LazyMotion>
    );
  };

export default PopoverContent;
