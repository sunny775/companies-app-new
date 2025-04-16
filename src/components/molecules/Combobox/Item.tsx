import { useId } from "@floating-ui/react";
import { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { useCombobox } from "./Context";

export interface ComboboxItemProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  value: string;
  active?: boolean;
  index?: number;
}

const itemStyles = tv({
  base: "py-2 px-3 rounded-md data-[active=true]:bg-green-600/10 data-[active=true]:text-green-500",
});

export const Item = ({ children, active, className, value, index = 0, onClick, ...rest }: ComboboxItemProps) => {
  const id = useId();

  const { getItemProps, setOpen, onSelect, listRef, refs, setQuery } = useCombobox();

  return (
    <div
      {...rest}
      role="option"
      id={id}
      aria-selected={active}
      data-active={active}
      className={itemStyles({ className })}
      {...getItemProps({
        ref(node) {
          listRef.current[index] = node;
        },
        onClick(e: React.MouseEvent<HTMLDivElement>) {
          setQuery(value);
          onSelect?.(value);
          setOpen(false);
          refs.domReference.current?.focus();
          onClick?.(e);
        },
      })}
    >
      {children}
    </div>
  );
};
