import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface DialogBodyProps extends React.ComponentProps<"div">, VariantProps<typeof dialogBodyStyles> {}

export const dialogBodyStyles = tv({
  base: "relative p-4 text-blue-gray-500 antialiased font-sans text-base font-light leading-relaxed",
  variants: {
    divider: {
      true: "border-t border-t-blue-gray-100 border-b border-b-blue-gray-100",
    },
  },
  defaultVariants: {
    divider: false,
  },
});

export const DialogBody = ({ divider, className, children, ref, ...rest }: DialogBodyProps) => {
  return (
    <div {...rest} ref={ref} className={dialogBodyStyles({ className, divider })}>
      {children}
    </div>
  );
};

export default DialogBody;
