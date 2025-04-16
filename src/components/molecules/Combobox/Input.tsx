import { Input as BaseInput, InputProps } from "@/components/atoms/Input";
import { ChevronDown } from "lucide-react";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useCombobox } from "./Context";

export interface ComboboxInputProps extends Omit<InputProps, "onSelect" | "value">, VariantProps<typeof inputStyles> {
  onSelect?: (value: string | null) => void;
  placeholder?: string;
}

const inputStyles = tv({
  slots: {
    icon: "transition-all rotate-0",
  },
  variants: {
    open: {
      true: {
        icon: "rotate-180 mt-px",
      },
    },
  },
});

export function Input({ id, icon, placeholder, onSelect, onKeyDown, name, onChange, ...rest }: ComboboxInputProps) {
  const { setOpen, refs, query, setQuery, open, setActiveIndex, activeIndex, listItems, getReferenceProps } = useCombobox();

  const styles = inputStyles({
    open,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    setOpen(true);
    setActiveIndex(0);
    onChange?.(event);
  }

  return (
    <BaseInput
      id={id}
      name={name}
      value={query}
      {...rest}
      ref={refs.setReference}
      aria-autocomplete="list"
      placeholder={placeholder || name}
      {...getReferenceProps({
        onChange: handleChange,
        onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
          if (event.key === "Enter" && activeIndex != null && listItems[activeIndex]) {
            setQuery(listItems[activeIndex]);
            onSelect?.(listItems[activeIndex]);
            setActiveIndex(null);
            setOpen(false);
          }
          onKeyDown?.(event);
        },
      })}
      icon={<div className={styles.icon()}>{icon || <ChevronDown strokeWidth={1} />}</div>}
    />
  );
}
