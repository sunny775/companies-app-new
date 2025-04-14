import React, { ReactNode, RefObject } from "react";
import { AnimatePresence, m, MotionProps, domAnimation, LazyMotion } from "framer-motion";
import { VariantProps } from "tailwind-variants";
import merge from "deepmerge";
import IconButton from "../IconButton";
import cn from "@/lib/cn";
import { alertStyles } from "./alert.styles";
import { Animation } from "../sharedTypes";

export interface AlertProps extends Omit<MotionProps, "animate">, VariantProps<typeof alertStyles> {
  color?: "default" | "success" | "error" | "info";
  icon?: ReactNode;
  open: boolean;
  onClose?: () => void;
  action?: ReactNode;
  animate?: Animation;
  className?: string;
  children?: ReactNode;
  ref: RefObject<HTMLDivElement>;
}

export const Alert = ({
  variant,
  color,
  icon,
  open,
  action,
  onClose,
  animate,
  className,
  children,
  ...rest
}: AlertProps) => {
  const styles = alertStyles({ variant, className });

  const classes = cn(styles.root(), color ? styles[color]() : styles.default());
  const actionClasses = cn(styles.action());

  const mainAnimation = {
    unmount: {
      opacity: 0,
    },
    mount: {
      opacity: 1,
    },
  };
  const appliedAnimation = merge(mainAnimation, animate || {});

  const iconTemplate = <div className="shrink-0">{icon}</div>;

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            {...rest}
            role="alert"
            className={`${classes} flex`}
            initial="unmount"
            exit="unmount"
            animate={open ? "mount" : "unmount"}
            variants={appliedAnimation}
          >
            {icon && iconTemplate}
            <div className={`${icon ? "ml-3" : ""} mr-12`}>{children}</div>
            {onClose && !action && (
              <IconButton
                onClick={onClose}
                size="sm"
                variant="text"
                color={variant === "outlined" || variant === "ghost" ? color : "default"}
                className={actionClasses}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </IconButton>
            )}
            {action || null}
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Alert;
