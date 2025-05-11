import { ComponentProps, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { inputStyles } from "./input.styles";

export type InputProps = ComponentProps<"input"> &
  Omit<VariantProps<typeof inputStyles>, "iconLeft" | "iconRight"> & {
    error?: boolean;
    success?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    containerProps?: ComponentProps<"div">;
    className?: string;
  };

export const Input = ({
  size,
  color,
  error,
  success,
  iconLeft,
  iconRight,
  disabled,
  containerProps,
  className,
  ref,
  id,
  ...rest
}: InputProps) => {
  const styles = inputStyles({
    iconLeft: !!iconLeft,
    iconRight: !!iconRight,
    disabled,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.base({ className: containerProps?.className });
  const inputClasses = styles.input({ className });

  return (
    <div {...containerProps} className={containerClasses}>
      {!!iconLeft && <div className={styles.iconLeft()}>{iconLeft}</div>}
      {!!iconRight && <div className={styles.iconRight()}>{iconRight}</div>}
      <input id={id} ref={ref} className={inputClasses} {...rest} />
    </div>
  );
};

export default Input;
