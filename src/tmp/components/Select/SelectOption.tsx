import React from "react";
import { useSelect } from "./SelectContext";
import { tv, VariantProps } from "tailwind-variants";

export interface SelectOptionProps extends React.ComponentProps<"li">, VariantProps<typeof selectOptionStyles> {
  value?: string;
  index?: number;
  disabled?: boolean;
}

const selectOptionStyles = tv({
  base: "pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline transition-all",
  variants: {
    disabled: {
      true: {
        option: "opacity-50 cursor-not-allowed select-none pointer-events-none",
      },
    },
  },
});

export const SelectOption = ({
  value = "",
  index = 0,
  disabled = false,
  className = "",
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
    dataRef,
  } = useSelect();

  function handleSelect() {
    setSelectedIndex(index);
    onChange(value);
    setOpen(false);
    setActiveIndex(null);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || (event.key === " " && !dataRef.current.typing)) {
      event.preventDefault();
      handleSelect();
    }
  }

  const styles = selectOptionStyles({
    className,
    disabled,
  });

  return (
    <li
      {...rest}
      role="option"
      {...(listRef?.current
        ? {
            ref: (node) => {
              listRef.current[index] = node;
            },
          }
        : {})}
      className={styles}
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
