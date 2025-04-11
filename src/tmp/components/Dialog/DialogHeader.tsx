import React from "react";
import { tv } from "tailwind-variants";

export const dialogHeaderStyles = tv({
  base: "flex items-center shrink-0 p-4 text-blue-gray-900 antialiased font-sans text-2xl font-semibold leading-snug",
});

export type DialogHeaderProps = React.ComponentProps<"div">;

export const DialogHeader = ({ className, children, ref, ...rest }: DialogHeaderProps) => {
  return (
    <div {...rest} ref={ref} className={dialogHeaderStyles({ className })}>
      {children}
    </div>
  );
};

export default DialogHeader;
