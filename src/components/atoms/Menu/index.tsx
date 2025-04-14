import React from "react";
import { FloatingTree, useFloatingParentNodeId } from "@floating-ui/react";
import { useMenu } from "./MenuContext";
import { MenuCore, MenuProps } from "./MenuCore";
import { MenuHandler, MenuHandlerProps } from "./MenuHandler";
import { MenuList, MenuListProps } from "./MenuList";
import { MenuItem, MenuItemProps } from "./MenuItem";

const Menu = ({
  ref,
  open,
  handler,
  placement,
  offset,
  dismiss,
  animate,
  lockScroll,
  allowHover,
  children,
}: MenuProps) => {
  const parentId = useFloatingParentNodeId();

  const props = {
    open,
    handler,
    placement,
    offset,
    dismiss,
    animate,
    lockScroll,
    allowHover,
  };

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuCore ref={ref} {...props}>
          {children}
        </MenuCore>
      </FloatingTree>
    );
  }

  return (
    <MenuCore ref={ref} {...props}>
      {children}
    </MenuCore>
  );
};

export type { MenuProps, MenuHandlerProps, MenuListProps, MenuItemProps };
export { Menu, MenuHandler, MenuList, MenuItem, useMenu };
export default Object.assign(Menu, { Handler: MenuHandler, List: MenuList, Item: MenuItem });
