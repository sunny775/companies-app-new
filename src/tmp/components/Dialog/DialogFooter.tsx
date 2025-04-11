import React from "react";
import { tv } from "tailwind-variants";

export const dialogFooterStyles = tv({
  base: "flex items-center justify-end shrink-0 flex-wrap p-4 text-blue-gray-500",
});

export type DialogFooterProps = React.ComponentProps<"div">;

export const DialogFooter = ({ className, children, ref, ...rest }: DialogFooterProps) => {
  return (
    <div {...rest} ref={ref} className={dialogFooterStyles({ className })}>
      {children}
    </div>
  );
};

export default DialogFooter;
