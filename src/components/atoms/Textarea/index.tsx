import cn from "@/lib/cn";
import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const textareaStyles = tv({
  slots: {
    base: "relative w-full min-w-[200px] text-gray-700 dark:text-gray-300",
    input:
      "peer h-full w-full rounded bg-transparent border text-sm focus:outline-none focus:border placeholder:text-gray-300 dark:placeholder:text-gray-700 placeholder:text-xs placeholder:italic",
    label: "flex items-center gap-2 my-3",
    icon: "grid place-items-center absolute text-gray-500 top-2 right-2",
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
        input: "border-black/10 dark:border-white/10 focus:border-green-500/50 dark:focus:border-green-500/30",
      },
      error: {
        input: "border-red-600/30 dark:border-red-500/20 focus:border-red-500/50 dark:focus:border-red-500/30",
      },
      success: {
        input: "border-green-500 dark:border-green-400 focus:border-green-500/50 dark:focus:border-green-500/30",
      },
    },
  },
  compoundVariants: [
    {
      size: "md",
      class: {
        input: "px-3 py-2.5 rounded-[7px]",
        icon: "size-5",
      },
    },
    {
      sizes: "lg",
      class: {
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

type TextareaProps = Omit<ComponentProps<"textarea">, "size" | "color"> &
  VariantProps<typeof textareaStyles> & {
    id: string;
    name: string;
    error?: boolean;
    success?: boolean;
    icon?: ReactNode;
    errorMessage?: ReactNode;
    containerProps?: ComponentProps<"div">;
    labelProps?: ComponentProps<"label"> & { title: string };
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
  ref,
  errorMessage,
  ...rest
}: TextareaProps) => {
  const styles = textareaStyles({
    icon: !!icon,
    disabled,
    showLabel,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.base({ className: containerProps?.className });
  const textareaClasses = styles.input({ className });
  const labelClasses = styles.label({ className: labelProps?.className });

  return (
    <div>
      <label {...labelProps} htmlFor={rest.id} className={labelClasses}>
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
        <textarea rows={5} {...rest} ref={ref} className={textareaClasses} />
      </div>
    </div>
  );
};

export default Input;
