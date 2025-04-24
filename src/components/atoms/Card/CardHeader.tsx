import cn from "@/lib/cn";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface CardHeaderProps extends React.ComponentProps<"div">, VariantProps<typeof cardHeaderStyles> {
  color?: "default" | "success" | "error" | "info";
}

const cardHeaderStyles = tv({
  base: "relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden",
  slots: {
    default: "bg-surface",
    success: "",
    error: "",
    info: "",
  },
  variants: {
    shadow: {
      true: "shadow-lg",
    },
    floated: {
      true: "-mt-6",
    },
    variant: {
      outlined: "border bg-transparent",
      filled: "",
      gradient: "text-white bg-gradient-to-tr",
      transparent: "bg-transparent",
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      class: {
        default: "border-gray-600/20 dark:shadow-white/2",
        success: "border-green-500 text-green-700 ",
        error: "border-red-500 text-red-700 ",
        info: "border-blue-500 text-blue-700 ",
      },
    },
    {
      variant: "gradient",
      class: {
        default: "from-gray-100 dark:from-surface to-neon shadow-green-500/40",
        success: "from-green-600 to-green-400 shadow-green-500/40",
        error: "from-red-600 to-red-400 shadow-red-500/40",
        info: "from-blue-600 to-blue-400 shadow-blue-500/40",
      },
    },
    {
      variant: "filled",
      class: {
        success: "bg-green-500 shadow-green-500/40",
        error: "bg-red-500 shadow-red-500/40",
        info: "bg-blue-500 shadow-blue-500/40",
      },
    },
  ],
  defaultVariants: {
    shadow: true,
    floated: true,
  },
});

export const CardHeader = ({ variant, color, shadow, floated, className, children, ...rest }: CardHeaderProps) => {
  const styles = cardHeaderStyles({ variant, shadow, floated });

  const classes = cn(color ? styles[color]() : styles.default(), styles.base({ className }));

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default CardHeader;
