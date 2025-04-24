import cn from "@/lib/cn";
import { ComponentProps, ReactNode, useId } from "react";
import { tv, VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  slots: {
    base: "relative w-full min-w-[200px] text-gray-700 dark:text-gray-300",
    input:
      "peer h-full w-full rounded bg-transparent border text-sm focus:outline-none focus:border placeholder:text-gray-300 dark:placeholder:text-gray-700 placeholder:text-xs placeholder:italic",
    label: "flex items-center gap-2 my-3",
    icon: "grid place-items-center absolute text-gray-500 top-2/4 right-3 -translate-y-2/4 transition-all",
    errorMessage: "invisible text-amber-600 text-xs font-extralight",
  },
  variants: {
    size: {
      md: "",
      lg: "",
    },
    icon: {
      true: "",
    },
    disabled: {
      true: {
        input: "opacity-80",
      },
    },
    showLabel: {
      false: {
        label: "sr-only",
      },
    },
    color: {
      default: {
        input: "border-gray-600/20 focus:border-green-500/40",
      },
      error: {
        input: "border-red-600/20 focus:border-red-500/40",
      },
      success: {
        input: "border-green-600/20 focus:border-green-500/40",
      },
    },
  },
  compoundVariants: [
    {
      size: "md",
      class: {
        base: "h-10",
        input: "px-3 py-2.5 rounded-[7px]",
        icon: "size-5",
      },
    },
    {
      sizes: "lg",
      class: {
        base: "h-11",
        input: "p-3 rounded-md",
        icon: "size-6",
      },
    },
    {
      icon: true,
      class: {
        input: "pr-9",
      },
    },
  ],
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

export type InputProps = Omit<ComponentProps<"input">, "size" | "color"> &
  Omit<VariantProps<typeof inputStyles>, "icon"> & {
    error?: boolean;
    success?: boolean;
    icon?: ReactNode;
    errorMessage?: ReactNode;
    containerProps?: ComponentProps<"div">;
    labelProps?: Omit<ComponentProps<"label">, "htmlFor"> & { title: string };
    showLabel?: boolean;
    className?: string;
  };

export const Input = ({
  size,
  color,
  error,
  success,
  icon,
  disabled,
  showLabel,
  labelProps,
  containerProps,
  className,
  id,
  errorMessage,
  ...rest
}: InputProps) => {
  const defaultId = useId();

  id = id ?? defaultId;
  
  error = error ?? !!errorMessage;
  showLabel = showLabel ?? !!errorMessage;

  const styles = inputStyles({
    icon: !!icon,
    disabled,
    size,
    showLabel,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.base({ className: containerProps?.className });
  const inputClasses = styles.input({ className });
  const labelClasses = styles.label({ className: labelProps?.className });

  return (
    <div>
      <label {...labelProps} htmlFor={id} className={labelClasses}>
        <span>{labelProps?.title || rest.name}</span>
        <span
          className={cn(styles.errorMessage(), {
            visible: error,
          })}
        >
          {errorMessage}
        </span>
      </label>
      <div {...containerProps} className={containerClasses}>
        {icon && <div className={styles.icon()}>{icon}</div>}
        <input {...rest} id={id} className={inputClasses} />
      </div>
    </div>
  );
};

export default Input;
