"use client";

import { MenuDropdown, MenuDropdownProps } from "./MenuDropdown";
import { MenuItem, MenuItemProps } from "./MenuItem";
import { MenuRoot, MenuRootProps } from "./MenuRoot";
import { MenuTrigger, MenuTriggerProps } from "./MenuTrigger";

export { useMenu, type MenuContextType } from "./MenuContext";

const Menu = Object.assign(MenuRoot, {
  Dropdown: MenuDropdown,
  Item: MenuItem,
  Trigger: MenuTrigger,
});

export default Menu;

export { MenuDropdown, MenuItem, MenuRoot, MenuTrigger };

export type { MenuDropdownProps, MenuItemProps, MenuRootProps, MenuTriggerProps };
