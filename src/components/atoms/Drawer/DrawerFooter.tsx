import React from "react";
import { tv } from "tailwind-variants";

export const drawerFooterStyles = tv({
  base: "shrink-0 px-4 py-3 border-t border-gray-600/20 flex justify-end gap-2",
});

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const DrawerFooter = ({ className, children, ...rest }: DrawerFooterProps) => {
  return (
    <div className={drawerFooterStyles({ className })} {...rest}>
      {children}
    </div>
  );
};
