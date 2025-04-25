import cn from "@/lib/cn";
import { X } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import IconButton from "../IconButton";
import Transition, { TransitionType } from "../Transition";
import { alertStyles } from "./alert.styles";

export interface AlertProps extends ComponentProps<"div">, VariantProps<typeof alertStyles> {
  icon?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  action?: ReactNode;
  animation?: TransitionType;
}

export const Alert = ({
  variant,
  icon,
  open,
  action,
  onClose,
  className,
  children,
  animation,
  ...rest
}: AlertProps) => {
  const styles = alertStyles({ variant, className });

  const classes = styles.base();
  const actionClasses = styles.action();

  const defaultAnimation = {
    duration: 400,
    mount: "opacity-100 scale-100",
    unmount: "opacity-0 scale-115",
  };

  const appliedAnimation: TransitionType = {
    ...defaultAnimation,
    ...animation,
  };

  return (
    <Transition show={!!open} {...appliedAnimation}>
      <div {...rest} role="alert" className={classes}>
        {icon && <div className="shrink-0">{icon}</div>}
        <div className={cn("mr-12", { "ml-3": icon })}>{children}</div>
        {onClose && !action && (
          <IconButton onClick={onClose} size="sm" variant={variant} className={actionClasses}>
            <X className="size-5" />
          </IconButton>
        )}
        {action || null}
      </div>
    </Transition>
  );
};

export default Alert;
