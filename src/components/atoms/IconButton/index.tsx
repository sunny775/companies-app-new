import React from "react";

export interface IconButtonProps extends React.ComponentProps<"button">, VariantProps<typeof iconButtonStyles> {
  color?: "default" | "success" | "error" | "info";
}

import { tv, VariantProps } from "tailwind-variants";
import cn from "@/lib/cn";

export const iconButtonStyles = tv({
  base: "relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none",
  slots: {
    icon: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
    default: "bg-surface",
    success: "",
    error: "",
    info: "",
    gray: "",
  },
  variants: {
    variant: {
      outlined: "bg-transparent shadow-none border hover:opacity-75 focus:ring active:opacity-[0.85]",
      filled: "",
      gradient: "text-white bg-gradient-to-tr hover:shadow-lg active:opacity-[0.85]",
      text: "",
      ghost: "",
    },
    size: {
      sm: "w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs",
      md: "w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs",
      lg: "w-12 max-w-[48px] h-12 max-h-[48px] rounded-lg text-sm",
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      class: {
        default: "border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "border-green-500 text-green-500 focus:ring-green-200",
        error: "border-red-500 text-red-700 focus:ring-red-200",
        info: "border-blue-500 text-blue-700 focus:ring-blue-200",
        gray: "border-gray-500 text-gray-700 focus:ring-gray-200",
      },
    },
    {
      variant: "ghost",
      class: {
        default:
          "bg-gray-100 dark:bg-green-600/10 border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "border-green-500 text-green-500 focus:ring-green-200",
        error: "border-red-500 text-red-700 focus:ring-red-200",
        info: "border-blue-500 text-blue-700 focus:ring-blue-200",
        gray: "border-gray-500 text-gray-700 focus:ring-gray-200",
      },
    },

    {
      variant: "gradient",
      class: {
        default: "from-surface to-neon",
        success: "from-green-600 to-green-400",
        error: "from-red-600 to-red-400",
        info: "from-blue-600 to-blue-400",
        gray: "from-gray-600 to-gray-400",
      },
    },

    {
      variant: "filled",
      class: {
        default: "border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "text-white bg-green-500",
        error: "text-white bg-red-500",
        info: "text-white bg-blue-500",
        gray: "text-white bg-gray-500",
      },
    },

    {
      variant: "text",
      class: {
        default: "hover:bg-green-500/10 active:bg-green-500/10 text-green-700",
        success: "hover:bg-green-500/10 active:bg-green-500/10 text-green-700",
        error: "hover:bg-red-500/10 active:bg-red-500/10 text-red-900",
        info: "hover:bg-blue-500/10 active:bg-blue-500/10 text-blue-900",
        gray: "hover:bg-gray-500/10 active:bg-gray-500/10 text-gray-900",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
  },
});

export const IconButton = ({ variant, size, color, className, children, ref, ...rest }: IconButtonProps) => {
  const styles = iconButtonStyles({
    variant,
    size,
    className,
  });

  const classes = cn(styles.base(), color ? styles[color]() : styles.default());
  return (
    <button {...rest} ref={ref} className={classes} type={rest.type || "button"}>
      <span className={styles.icon()}>{children}</span>
    </button>
  );
};

export default IconButton;
