import { ComponentProps } from "react";
import { VariantProps } from "tailwind-variants";
import { inputStyles } from "../Input/input.styles";

export type TextareaProps = ComponentProps<"textarea"> &
  VariantProps<typeof inputStyles> & {
    error?: boolean;
    success?: boolean;
    containerProps?: ComponentProps<"div">;
    className?: string;
  };

export const Textarea = ({
  rows,
  size,
  color,
  error,
  success,
  disabled,
  containerProps,
  className,
  ref,
  id,
  ...rest
}: TextareaProps) => {
  const styles = inputStyles({
    disabled,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.base({ className: containerProps?.className });
  const textareaClasses = styles.input({ className });

  return (
    <div {...containerProps} className={containerClasses}>
      <textarea {...rest} rows={rows || 5} id={id} ref={ref} className={textareaClasses} disabled={disabled} />
    </div>
  );
};

export default Textarea;
