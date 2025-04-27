import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface IconButtonProps extends React.ComponentProps<"button">, VariantProps<typeof iconButtonStyles> {
  color?: "default" | "success" | "error" | "info";
}

export const iconButtonStyles = tv({
  base: "relative select-none font-sans font-medium text-center transition-all disabled:opacity-50  disabled:pointer-events-none cursor-pointer active:scale-105 active:opacity-[0.85] rounded-full shrink-0",
  slots: {
    icon: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
  },
  variants: {
    variant: {
      default: "bg-gray-100 text-gray-500 dark:text-gray-400 dark:bg-surface-2",
      success: "bg-green-600/10  text-green-700 dark:text-green-400",
      error: "bg-red-600/10  text-red-700 dark:text-red-400",
      info: "bg-blue-600/10  text-blue-700 dark:text-blue-400",
      gray: "bg-gray-600/10 text-gray-700 dark:text-gray-400",
    },
    size: {
      sm: "size-8  text-xs",
      md: "size-10 text-xs",
      lg: "size-12 text-sm",
    },
  },

  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const IconButton = ({ variant, size, className, children, ref, ...rest }: IconButtonProps) => {
  const styles = iconButtonStyles({
    variant,
    size,
  });

  return (
    <button {...rest} ref={ref} className={styles.base({ className })} type={rest.type || "button"}>
      <span className={styles.icon()}>{children}</span>
    </button>
  );
};

export default IconButton;
