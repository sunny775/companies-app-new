import { Dropdown, ComboboxDropdownProps } from "./Dropdown";
import { Item, ComboboxItemProps } from "./Item";
import { Root, ComboboxProps } from "./Root";
import { ComboboxInputProps, Input } from "./Input";

export { useCombobox } from "./Context";

const Combobox = { Root, Input, Dropdown, Item };

export default Combobox;

export { Dropdown, Item, Root as Combobox, Input };

export type { ComboboxDropdownProps, ComboboxItemProps, ComboboxProps, ComboboxInputProps };
