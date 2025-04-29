import { ComponentProps, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { inputStyles } from "../Input/input.styles";

export type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof inputStyles> & {
    error?: boolean;
    success?: boolean;
    icon?: ReactNode;
    containerProps?: ComponentProps<"div">;
    className?: string;
  };

export const Textarea = ({
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
}: TextareaProps) => {
  const styles = inputStyles({
    icon: !!icon,
    disabled,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.base({ className: containerProps?.className });
  const textareaClasses = styles.input({ className });

  return (
    <div {...containerProps} className={containerClasses}>
      {icon && <div className={styles.icon()}>{icon}</div>}
      <textarea rows={5} id={id} ref={ref} className={textareaClasses} {...rest} />
    </div>
  );
};

export default Textarea;
