import React, { ComponentProps } from "react";
import { tv } from "tailwind-variants";

export type MenuItemProps = ComponentProps<"button">;

export const menuItemStyles = tv({
  base: "block w-full pt-[9px] pb-2 px-3 rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none",
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed pointer-events-none select-none hover:bg-transparent focus:bg-transparent active:bg-transparent hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500",
    },
  },
});

export const MenuItem = ({
  className,
  disabled,
  children,
  ...rest
}: MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const styles = menuItemStyles({ className, disabled });

  return (
    <li>
      <button {...rest} disabled role="menuitem" className={styles}>
        {children}
      </button>
    </li>
  );
};

export default MenuItem;
