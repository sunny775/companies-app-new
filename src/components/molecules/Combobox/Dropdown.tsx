import { Animation } from "@/components/atoms/sharedTypes";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import merge from "deepmerge";
import { AnimatePresence, domAnimation, HTMLMotionProps, LazyMotion, m, Variants } from "framer-motion";
import React, { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useCombobox } from "./Context";
import { ComboboxItemProps } from "./Item";

const dropdownStyles = tv({
  base: "bg-surface p-3 border border-gray-50 dark:border-white/5 rounded-md shadow-lg shadow-gray-500/10 dark:shadow-gray-500/2 font-sans text-sm font-normal text-gray-500 dark:text-gray-400 overflow-auto grid gap-2",
});

export interface ComboboxDropdownProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  animate?: Animation;
  children: ReactNode;
}

export function Dropdown({
  children,
  className,
  animate = {
    unmount: {},
    mount: {},
  },
  ...rest
}: ComboboxDropdownProps) {
  const { open, context, x, y, strategy, floatingStyles, getFloatingProps, activeIndex, refs } = useCombobox();

  const styles = dropdownStyles({ className });

  const animation: Variants = {
    unmount: {
      opacity: [1, 0.8, 0.5, 0],
      scale: [1, 0.98, 0.96, 0.95],
      transformOrigin: "top",
      transition: {
        duration: 0.3,
        times: [0, 0.4, 0.6, 1],
      },
    },
    mount: {
      opacity: [0, 0.5, 0.8, 1],
      scale: [0.95, 0.96, 0.98, 1],
      transformOrigin: "top",
      transition: {
        duration: 0.2,
        times: [0, 0.4, 0.6, 1],
      },
    },
  };

  const appliedAnimation = merge(animation, animate);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {open ? (
            <FloatingPortal>
              <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
                <m.div
                  {...rest}
                  {...getFloatingProps({
                    ref: refs.setFloating,
                    style: {
                      ...floatingStyles,
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      overflow: "auto",
                    },
                    className: styles,
                  })}
                  initial="unmount"
                  exit="unmount"
                  animate={open ? "mount" : "unmount"}
                  variants={appliedAnimation}
                >
                  {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) return null;

                    const el = child as React.ReactElement<ComboboxItemProps>;

                    return React.cloneElement(el, {
                      index,
                      active: activeIndex === index,
                    });
                  })}
                </m.div>
              </FloatingFocusManager>
            </FloatingPortal>
          ) : null}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
