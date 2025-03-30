import React from "react";
import cn from "@/lib/cn";

export const buttonStyles = {
  base: "h-9 px-6 inline-flex items-center justify-center rounded-md transition-all py-5 font-sans text-xs font-bold uppercase shadow hover:shadow-md cursor-pointer active:opacity-[0.85] active:scale-105 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
  default:
    "border border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
  primary:
    "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20 hover:shadow-green-500/40",
  gradient:
    "bg-gradient-to-r from-green-600 to-neon text-white shadow-green-500/20 hover:shadow-green-500/40",
  outlined:
    "border bg-green-50 dark:bg-green-500/10 dark:border-green-500/20 border-green-200 text-green-600 hover:opacity-75 focus:ring focus:ring-green-200",
};

interface ButtonpProps extends React.ComponentProps<"button"> {
  variant?: Exclude<keyof typeof buttonStyles, "base">;
}

const Button = ({ className, variant, ...props }: ButtonpProps) => {
  return (
    <button
      className={cn(
        buttonStyles.base,
        variant ? buttonStyles[variant] : buttonStyles.default,
        className
      )}
      {...props}
    />
  );
};

export default Button;
