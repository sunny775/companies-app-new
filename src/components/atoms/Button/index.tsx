import Spinner from "@/components/loaders/Spinner";
import cn from "@/lib/cn";
import React from "react";
import { VariantProps } from "tailwind-variants";
import { buttonStyles } from "./button.styles";

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonStyles> {
  color?: "default" | "success" | "error" | "info";
  loading?: boolean;
}

export const Button = ({ variant, size, color, fullWidth, className, children, loading, ...rest }: ButtonProps) => {
  const styles = buttonStyles({
    variant,
    size,
    fullWidth,
    loading,
  });

  const classes = cn(styles.base(), color ? styles[color]() : styles.default(), className);

  return (
    <button {...rest} disabled={rest.disabled ?? loading} className={classes} type={rest.type || "button"}>
      {loading && <Spinner className={styles.spinner()} />}
      {children}
    </button>
  );
};

export default Button;
