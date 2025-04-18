import cn from "@/lib/cn";
import merge from "deepmerge";
import { AnimatePresence, domAnimation, LazyMotion, m, MotionProps } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, RefObject } from "react";
import { VariantProps } from "tailwind-variants";
import IconButton from "../IconButton";
import { Animation } from "../sharedTypes";
import { alertStyles } from "./alert.styles";

export interface AlertProps extends Omit<MotionProps, "animate">, VariantProps<typeof alertStyles> {
  icon?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  action?: ReactNode;
  animate?: Animation;
  className?: string;
  children?: ReactNode;
  ref?: RefObject<HTMLDivElement>;
}

export const Alert = ({ variant, icon, open, action, onClose, animate, className, children, ...rest }: AlertProps) => {
  const styles = alertStyles({ variant, className });

  const classes = styles.base();
  const actionClasses = styles.action();

  const mainAnimation = {
    unmount: {
      opacity: 0,
    },
    mount: {
      opacity: 1,
    },
  };
  const appliedAnimation = merge(mainAnimation, animate || {});

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            {...rest}
            role="alert"
            className={classes}
            initial="unmount"
            exit="unmount"
            animate={open ? "mount" : "unmount"}
            variants={appliedAnimation}
          >
            {icon && <div className="shrink-0">{icon}</div>}
            <div className={cn("mr-12", { "ml-3": icon })}>{children}</div>
            {onClose && !action && (
              <IconButton onClick={onClose} size="sm" variant={variant} className={actionClasses}>
                <X className="size-5" />
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
