import { Dropdown, SelectDropdownProps } from "./Dropdown";
import { Option, SelectOptionProps } from "./Option";
import { Root, SelectProps } from "./Root";
import { SelectTriggerProps, Trigger } from "./Trigger";

export { useSelect } from "./Context";

const Select = { Root, Trigger, Dropdown, Option };

export default Select;

export { Dropdown, Option, Root as Select, Trigger };

export type { SelectDropdownProps, SelectOptionProps, SelectProps, SelectTriggerProps };
