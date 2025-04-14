import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: "h-9 px-6 inline-flex items-center justify-center rounded-md transition-all py-5 font-sans text-xs font-bold uppercase shadow hover:shadow-md cursor-pointer active:opacity-[0.85] active:scale-105 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
  variants: {
    variant: {
      default:
        "border border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
      primary:
        "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20 hover:shadow-green-500/40",
      gradient:
        "bg-gradient-to-r from-green-600 to-neon text-white shadow-green-500/20 hover:shadow-green-500/40",
      outlined:
        "border bg-green-50 dark:bg-green-500/10 dark:border-green-500/20 border-green-200 text-green-600 hover:opacity-75 focus:ring focus:ring-green-200",
    },
    disabled: {
      true: "opacity-90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

interface ButtonpProps extends ButtonVariants, React.ComponentProps<"button"> {}

const Button = ({ className, variant, ...props }: ButtonpProps) => {
  return (
    <button className={buttonStyles({ className, variant, disabled: props.disabled })} {...props} />
  );
};

export default Button;
