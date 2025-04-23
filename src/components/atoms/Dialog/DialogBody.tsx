import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { useDialog } from "./DialogContext";

export const dialogBodyStyles = tv({
  base: "relative p-4  antialiased font-sans text-base font-light leading-relaxed",
  variants: {
    divider: {
      true: "border-t border-t-gray-900/10  border-b border-b-gray-900/10",
    },
  },
  defaultVariants: {
    divider: false,
  },
});

export type DialogBodyProps = React.ComponentProps<"div"> & VariantProps<typeof dialogBodyStyles>;

export const DialogBody = ({ divider, className, children, ...rest }: DialogBodyProps) => {
  const { descriptionId } = useDialog();
  return (
    <div {...rest} className={dialogBodyStyles({ className, divider })} id={descriptionId}>
      {children}
    </div>
  );
};
