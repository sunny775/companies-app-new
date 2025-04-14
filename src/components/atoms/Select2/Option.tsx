import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useSelect } from "./SelectContext";

export interface SelectOptionProps extends React.ComponentProps<"li">, VariantProps<typeof selectOptionStyles> {
  value: string;
  index?: number;
  disabled?: boolean;
}

const selectOptionStyles = tv({
  base: "pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none transition-all outline-0",
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed select-none pointer-events-none",
    },
    selected: {
      true: "border border-green-600/10 text-green-500",
    },
    active: {
      true: "bg-green-600/10 text-green-500",
    },
  },
});

export const SelectOption = ({
  value,
  index = 0,
  disabled = false,
  className,
  children,
  ...rest
}: SelectOptionProps) => {
  const {
    selectedIndex,
    setSelectedIndex,
    listRef,
    setOpen,
    onChange,
    activeIndex,
    setActiveIndex,
    getItemProps,
    isTypingRef,
  } = useSelect();

  function handleSelect() {
    setSelectedIndex(index);
    onChange(value);
    setOpen(false);
    setActiveIndex(null);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || (event.key === " " && !isTypingRef.current)) {
      event.preventDefault();
      handleSelect();
    }
  }

  return (
    <li
      {...rest}
      role="option"
      ref={(node) => {
        listRef.current[index] = node;
      }}
      className={selectOptionStyles({
        className,
        disabled,
        selected: selectedIndex === index,
        active: activeIndex === index,
      })}
      tabIndex={activeIndex === index ? 0 : 1}
      aria-selected={activeIndex === index && selectedIndex === index}
      data-selected={selectedIndex === index}
      {...getItemProps({
        onClick: (e: React.MouseEvent<HTMLLIElement>) => {
          const onClick = rest?.onClick;

          if (typeof onClick === "function") {
            onClick(e);
            handleSelect();
          }

          handleSelect();
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLLIElement>) => {
          const onKeyDown = rest?.onKeyDown;

          if (typeof onKeyDown === "function") {
            onKeyDown(e);
            handleKeyDown(e);
          }

          handleKeyDown(e);
        },
      })}
    >
      {children}
    </li>
  );
};

export default SelectOption;
