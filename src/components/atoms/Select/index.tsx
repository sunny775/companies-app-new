import { SelectDropdown, SelectDropdownProps } from "./SelectDropdown";
import { SelectInput, SelectInputProps } from "./SelectInput";
import { SelectList, SelectListProps } from "./SelectList";
import { SelectListItem, SelectListItemProps } from "./SelectListItem";
import { SelectRoot, SelectRootProps } from "./SelectRoot";
import { SelectTrigger, SelectTriggerProps } from "./SelectTrigger";

export { useSelect } from "./SelectContext";

const Select = {
  Root: SelectRoot,
  Dropdown: SelectDropdown,
  List: SelectList,
  Item: SelectListItem,
  Input: SelectInput,
  Trigger: SelectTrigger,
};

export default Select;

export { SelectDropdown, SelectInput, SelectList, SelectListItem, SelectRoot, SelectTrigger };

export type {
  SelectDropdownProps,
  SelectInputProps,
  SelectListItemProps,
  SelectListProps,
  SelectRootProps,
  SelectTriggerProps,
};
