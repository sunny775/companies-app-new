import { ComponentProps, ReactNode, useId } from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "color">,
    VariantProps<typeof checkboxStyles> {
  label?: ReactNode;
  icon?: ReactNode;
  containerProps?: ComponentProps<"label">;
  labelProps?: ComponentProps<"label">;
  iconProps?: ComponentProps<"span">;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const checkboxStyles = tv({
  base: "inline-flex items-center",
  slots: {
    container: "relative flex items-center cursor-pointer p-3 rounded-full",
    input:
      "peer relative appearance-none w-5 h-5 border rounded-md border-blue-gray-200 cursor-pointer transition-all before:content-[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity",
    label: "text-gray-700 font-light select-none cursor-pointer mt-px",
    icon: "text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity",
  },
  variants: {
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    color: {
      default: "checked:bg-gray-500 checked:border-gray-500 checked:before:bg-gray-500",
      success: "checked:bg-green-500 checked:border-green-500 checked:before:bg-green-500",
      error: "checked:bg-red-500 checked:border-red-500 checked:before:bg-red-500",
      info: "checked:bg-blue-500 checked:border-blue-500 checked:before:bg-blue-500",
    },
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
      <label {...containerProps} className={containerClasses} htmlFor={rest.id || checkboxId}>
        <input
          {...rest}
          ref={inputRef}
          type="checkbox"
          disabled={disabled}
          className={styles.input()}
          id={rest.id || checkboxId}
        />
        <span className={iconContainerClasses}>
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </label>
      {label && (
        <label {...labelProps} className={labelClasses} htmlFor={rest.id || checkboxId}>
          {label}
        </label>
      )}
    </div>
  );
};
export default Checkbox;
