import React from "react";
import { CardHeader, CardHeaderProps } from "./CardHeader";
import { CardBody, CardBodyProps } from "./CardBody";
import { CardFooter, CardFooterProps } from "./CardFooter";
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
      filled: "text-white",
      gradient: "text-white bg-gradient-to-tr",
      transparent: "bg-transparent",
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      class: {
        default: "border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
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
  },
});

export interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardStyles> {
  color?: "default" | "success" | "error" | "info";
}

const Card = ({ variant, color, shadow, className, children, ...rest }: CardProps) => {
  const styles = cardStyles({ className, variant, shadow });

  const classes = color ? styles[color]() : styles.default();
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export type { CardHeaderProps, CardBodyProps, CardFooterProps };
export { Card, CardHeader, CardBody, CardFooter };
export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
