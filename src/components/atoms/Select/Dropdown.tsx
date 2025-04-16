"use client";

import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import merge from "deepmerge";
import { AnimatePresence, domAnimation, HTMLMotionProps, LazyMotion, m, Variants } from "framer-motion";
import React, { ComponentProps, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Animation } from "../sharedTypes";
import { useSelect } from "./Context";
import { SelectOptionProps } from "./Option";

export type SelectDropdownProps = Omit<HTMLMotionProps<"ul">, "animate"> &
  ComponentProps<"ul"> & {
    animate?: Animation;
    children: ReactNode;
  };

export const dropdownStyles = tv({
  base: "w-full max-h-96 bg-surface p-3 border border-gray-50 dark:border-white/5 rounded-md shadow-lg shadow-gray-500/10 dark:shadow-gray-500/2 font-sans text-sm font-normal text-gray-500 dark:text-gray-400 overflow-auto focus:outline-none grid gap-2",
});

export const Dropdown = ({
  className,
  children,
  animate = {
    unmount: {},
    mount: {},
  },
  ...rest
}: SelectDropdownProps) => {
  const { open, context, x, y, strategy, floatingStyles, getFloatingProps, selectedIndex, activeIndex, refs } =
    useSelect();

  const styles = dropdownStyles({
    className,
  });

  const animation: Variants = {
    unmount: {
      opacity: [1, 0.8, 0.5, 0],
      scale: [1, 0.98, 0.96, 0.95],
      transformOrigin: "top",
      transition: {
        duration: 0.2,
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

  return open ? (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <m.ul
              {...rest}
              role="listbox"
              ref={refs.setFloating}
              className={styles}
              style={{
                ...floatingStyles,
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                overflow: "auto",
              }}
              {...getFloatingProps()}
              initial="unmount"
              exit="unmount"
              animate={open ? "mount" : "unmount"}
              variants={appliedAnimation}
            >
              {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return null;

                const el = child as React.ReactElement<SelectOptionProps>;

                return React.cloneElement(el, {
                  index,
                  active: activeIndex === index,
                  selected: selectedIndex === index,
                });
              })}
            </m.ul>
          </FloatingFocusManager>
        </FloatingPortal>
      </AnimatePresence>
    </LazyMotion>
  ) : null;
};
