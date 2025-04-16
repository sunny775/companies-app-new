import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useSelect } from "./Context";

export interface SelectOptionProps extends React.ComponentProps<"li">, VariantProps<typeof selectOptionStyles> {
  value: string;
  index?: number;
  active?: boolean;
  selected?: boolean;
}

const selectOptionStyles = tv({
  base: "pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none outline-0 data-[active=true]:bg-green-600/10 data-[active=true]:text-green-500 data-[selected=true]:border data-[selected=true]:border-green-600/10 data-[selected=true]:text-green-500",
});

export const Option = ({
  active,
  selected,
  className,
  children,
  index = 0,
  onClick,
  onKeyDown,
  ...rest
}: SelectOptionProps) => {
  const { isTypingRef, listRef, getItemProps, handleSelect } = useSelect();

  return (
    <li
      {...rest}
      role="option"
      data-active={active}
      data-selected={selected}
      className={selectOptionStyles({ className })}
      tabIndex={active ? 0 : -1}
      aria-selected={active && selected}
      {...getItemProps({
        ref: (node: HTMLLIElement | null) => {
          listRef.current[index] = node;
        },
        onClick: (e: React.MouseEvent<HTMLLIElement>) => {
          handleSelect(index);
          onClick?.(e);
        },
        onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>) => {
          if (event.key === "Enter" || (event.key === " " && !isTypingRef.current)) {
            event.preventDefault();
            handleSelect(index);
          }
          onKeyDown?.(event);
        },
      })}
    >
      {children}
    </li>
  );
};

export default Option;
