import { Check } from "lucide-react";
import { ComponentProps, ReactNode, useId } from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "color">,
    VariantProps<typeof checkboxStyles> {
  label?: ReactNode;
  icon?: ReactNode;
  containerProps?: ComponentProps<"div">;
  labelProps?: ComponentProps<"label">;
  iconProps?: ComponentProps<"span">;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const checkboxStyles = tv({
  base: "inline-flex items-center",
  slots: {
    container: "relative flex items-center cursor-pointer p-3 rounded-full",
    input:
      "peer relative appearance-none w-5 h-5 border rounded-md border-gray-600/40 cursor-pointer transition-all before:content-[''] before:block before:bg-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity",
    label: "text-gray-700 font-light select-none cursor-pointer mt-px",
    icon: "absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 peer-checked:text-gray-100 transition-opacity",
  },
  variants: {
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    color: {
      default: {
        input: "checked:bg-gray-500 checked:border-gray-500 checked:before:bg-gray-500",
      },
      success: {
        input: "checked:bg-green-500 checked:border-green-500 checked:before:bg-green-500",
      },
      error: {
        input: "checked:bg-red-500 checked:border-red-500 checked:before:bg-red-500",
      },
      info: {
        input: "checked:bg-blue-500 checked:border-blue-500 checked:before:bg-blue-500",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export const Checkbox = ({
  color,
  label,
  icon,
  className,
  disabled,
  containerProps,
  labelProps,
  iconProps,
  inputRef,
  ref,
  ...rest
}: CheckboxProps) => {
  const checkboxId = useId();

  const styles = checkboxStyles({ color, disabled });

  const rootStyles = styles.base({ className });

  const containerClasses = styles.container({ className: containerProps?.className });

  const labelClasses = styles.label({ className: labelProps?.className });

  const iconContainerClasses = styles.icon({ className: iconProps?.className });

  return (
    <div ref={ref} className={rootStyles}>
      <div {...containerProps} className={containerClasses}>
        {label && (
          <label {...labelProps} className={labelClasses} htmlFor={rest.id || checkboxId}>
            {label}
          </label>
        )}
        <input
          {...rest}
          ref={inputRef}
          type="checkbox"
          disabled={disabled}
          className={styles.input()}
          id={rest.id || checkboxId}
        />
        <span className={iconContainerClasses}>{icon || <Check className="w-3.5 h-3.5" strokeWidth={3} />}</span>
      </div>
    </div>
  );
};
export default Checkbox;
