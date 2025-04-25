import cn from "@/lib/cn";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const cardStyles = tv({
  base: "relative flex flex-col bg-clip-border rounded-xl",
  slots: {
    default: "bg-surface",
    success: "",
    error: "",
    info: "",
  },
  variants: {
    shadow: {
      true: "shadow-md",
    },
    variant: {
      outlined: "border bg-transparent",
      filled: "",
      gradient: "bg-gradient-to-tr text-gray-100",
      transparent: "bg-transparent",
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      class: {
        default: "border-gray-600/20",
        success: "border-green-600/20 text-green-700 dark:text-green-400 ",
        error: "border-red-600/20 text-red-700 dark:text-red-400",
        info: "border-blue-600/20 text-blue-700 dark:text-blue-400",
      },
    },
    {
      variant: "gradient",
      class: {
        default: "from-green-600 to-neon shadow-green-600/40",
        success: "from-green-600 to-green-400 shadow-green-600/40",
        error: "from-red-600 to-red-400 shadow-red-600/40",
        info: "from-blue-600 to-blue-400 shadow-blue-600/40",
      },
    },
    {
      variant: "filled",
      class: {
        // default: "text-gray-700 dark:text-gray-100",
        success: "bg-green-600 shadow-green-500/40",
        error: "bg-red-600 shadow-red-500/40",
        info: "bg-blue-600 shadow-blue-500/40",
      },
    },
  ],
  compoundSlots: [
    {
      variant: ["filled", "gradient"],
      slots: ["success", "error", "info"],
      class: "text-white"
    }
  ],
  defaultVariants: {
    shadow: true,
    variant: "filled",
  },
});

export interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardStyles> {
  color?: "default" | "success" | "error" | "info";
}

export const Root = ({ variant, color, shadow, className, children, ...rest }: CardProps) => {
  const styles = cardStyles({ variant, shadow });

  const classes = cn(color ? styles[color]() : styles.default(), styles.base({ className }));
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
