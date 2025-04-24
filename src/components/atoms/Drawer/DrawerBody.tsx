import React from "react";
import { tv } from "tailwind-variants";
import { useDrawer } from "./DrawerContext";

export const drawerBodyStyles = tv({
  base: "flex-1 overflow-auto p-4",
});

export type DrawerBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const DrawerBody = ({ className, children, ...rest }: DrawerBodyProps) => {
  const { descriptionId } = useDrawer();

  return (
    <div className={drawerBodyStyles({ className })} id={descriptionId} {...rest}>
      {children}
    </div>
  );
};
