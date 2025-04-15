import cn from "@/lib/cn";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export interface SelectOptionProps extends React.ComponentProps<"li">, VariantProps<typeof selectOptionStyles> {
  value: string;
  active?: boolean;
  selected?: boolean;
}

const selectOptionStyles = tv({
  base: "pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none transition-all outline-0 data-[active=true]:bg-green-600/10 data-[active=true]:text-green-500 data-[selected=true]:border data-[selected=true]:border-green-600/10 data-[selected=true]:text-green-500",
});

export const SelectOption = ({ active, selected, className, children, ...rest }: SelectOptionProps) => {
  return (
    <li
      role="option"
      data-active={active}
      data-selected={selected}
      className={cn(selectOptionStyles(), className)}
      tabIndex={active ? 0 : 1}
      aria-selected={active && selected}
      {...rest}
    >
      {children}
    </li>
  );
};

export default SelectOption;
