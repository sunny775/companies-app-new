import React from "react";
import { tv } from "tailwind-variants";
import { useDrawer } from "./DrawerContext";

export const drawerHeaderStyles = tv({
  slots: {
    base: "flex justify-between items-center px-4 border-b border-gray-600/20 h-16 shrink-0",
    title: "text-lg font-semibold",
  },
});

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const DrawerHeader = ({ className, children, title, ...rest }: DrawerHeaderProps) => {
  const { titleId } = useDrawer();

  const styles = drawerHeaderStyles();

  return (
    <div className={styles.base({ className })} {...rest}>
      {title ? (
        <h2 id={titleId} className={styles.title()}>
          {title}
        </h2>
      ) : (
        children
      )}
    </div>
  );
};
