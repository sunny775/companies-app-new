"use client";

import { MenuDivider, MenuDividerProps } from "./MenuDivider";
import { MenuDropdown, MenuDropdownProps } from "./MenuDropdown";
import { MenuItem, MenuItemProps } from "./MenuItem";
import { MenuRoot, MenuRootProps } from "./MenuRoot";
import { MenuTrigger, MenuTriggerProps } from "./MenuTrigger";

export { useMenu, type MenuContextType } from "./MenuContext";

const Menu = Object.assign(MenuRoot, {
  Dropdown: MenuDropdown,
  Item: MenuItem,
  Trigger: MenuTrigger,
  Divider: MenuDivider,
});

export default Menu;

export { MenuDivider, MenuDropdown, MenuItem, MenuRoot, MenuTrigger };

export type { MenuDividerProps, MenuDropdownProps, MenuItemProps, MenuRootProps, MenuTriggerProps };
