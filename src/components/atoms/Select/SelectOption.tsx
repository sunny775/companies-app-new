import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface SelectOptionProps extends React.ComponentProps<"li">, VariantProps<typeof selectOptionStyles> {
  value: string;
  active?: boolean;
  selected?: boolean;
}

const selectOptionStyles = tv({
  base: "pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none transition-all outline-0",
  variants: {
    selected: {
      true: "border border-green-600/10 text-green-500",
    },
    active: {
      true: "bg-green-600/10 text-green-500",
    },
  },
});

export const SelectOption = ({
  active,
  selected,
  className,
  children,
  ...rest
}: SelectOptionProps) => {

  return (
    <li
      {...rest}
      role="option"
      className={selectOptionStyles({
        className,
        selected,
        active
      })}
      tabIndex={active ? 0 : 1}
      aria-selected={active && selected}
    >
      {children}
    </li>
  );
};

export default SelectOption;
