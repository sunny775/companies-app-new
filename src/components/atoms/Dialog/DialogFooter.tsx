import React from "react";
import { tv } from "tailwind-variants";

export const dialogFooterStyles = tv({
  base: "flex items-center justify-end shrink-0 flex-wrap p-4",
});

export type DialogFooterProps = React.ComponentProps<"div">;


export const DialogFooter = ({ className, children, ...rest }: DialogFooterProps) => {
  return (
    <div {...rest} className={dialogFooterStyles({ className })}>
      {children}
    </div>
  );
};
