import { ComponentProps, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { inputStyles } from "./input.styles";

export type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputStyles> & {
    error?: boolean;
    success?: boolean;
    icon?: ReactNode;
    containerProps?: ComponentProps<"div">;
    className?: string;
  };

export const Input = ({
  size,
  color,
  error,
  success,
  icon,
  disabled,
  containerProps,
  className,
  ref,
  id,
  ...rest
}: InputProps) => {
  const styles = inputStyles({
    icon: !!icon,
    disabled,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.base({ className: containerProps?.className });
  const inputClasses = styles.input({ className });

  return (
    <div {...containerProps} className={containerClasses}>
      {icon && <div className={styles.icon()}>{icon}</div>}
      <input id={id} ref={ref} className={inputClasses} {...rest} />
    </div>
  );
};

export default Input;
