import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

export type LabelProps = ComponentProps<"label"> & VariantProps<typeof labelStyles>;

export const labelStyles = tv({
  base: "text-sm font-light",
  variants: {
    error: {
      true: "text-amber-600",
    },
    srOnly: {
      true: "sr-only",
    },
  },
});

export default function Label({ htmlFor, error, srOnly, className, children, ...rest }: LabelProps) {
  const styles = labelStyles({
    srOnly,
    error,
    className,
  });

  return (
    <label {...rest} htmlFor={htmlFor} className={styles}>
      {children}
    </label>
  );
}
