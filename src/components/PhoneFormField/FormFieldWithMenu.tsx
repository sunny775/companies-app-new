import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useMenu } from "../Menu/Menu";
import { MenuList } from "../Menu/MenuList";
import { MenuItem } from "../Menu/MenuItem";
import { splitCamelPascalCase } from "@/lib/splitCamelCasePascalCase";
import { FormFieldProps } from "../CreateCompanyForm/FormField";
import { FieldValues } from "react-hook-form";

export type Props<T extends FieldValues> =  {
  countries: {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
  }[];
  errorMessage: string | null;
  loading: boolean;
} & FormFieldProps<T>

export function FormFieldWithMenu<T extends FieldValues>({ countries, loading, errorMessage }: Props<T>) {
  const { menuOpen, openMenu } = useMenu();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!menuOpen) return;

    if (event.key === "ArrowDown") {
      setFocusedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, countries.length - 1)
      );
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prev) =>
        prev === null ? countries.length - 1 : Math.max(prev - 1, 0)
      );
      event.preventDefault();
    } else if (event.key === "Enter" && focusedIndex !== null) {
      setSelectedIndex(focusedIndex);
      openMenu(false);
    } else if (event.key === "Escape") {
      openMenu(false);
    }
  };

  return (
    <label key={name} className={cn("flex flex-col gap-2")}>
      <div className="flex items-center gap-2">
        <span>{splitCamelPascalCase(getNestedName(name))}</span>
        <p
          className={cn("invisible text-amber-600 text-xs font-extralight", {
            visible: error,
          })}
        >
          {errorMessage}
        </p>
      </div>
      <Button
        type="button"
        onClick={() => openMenu((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 pl-3 pr-2 focus:outline-none py-0 shadow-none hover:shadow-none border-black/10 dark:border-white/10"
        aria-haspopup="listbox"
        aria-expanded={menuOpen}
      >
        <div className="text-3xl rounded-full">
          {countries[selectedIndex]?.flag}
        </div>
        {countries[selectedIndex]?.dial_code}
      </Button>
      <Input
        type="tel"
        placeholder="Mobile Number"
        className="rounded-l-none px-3 py-2 w-full"
      />
      <MenuList>
        {loading ? (
          <p>Loading countries...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          countries.map(({ name, flag, dial_code }, index) => (
            <MenuItem
              key={name}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => {
                setSelectedIndex(index);
                openMenu(false);
              }}
            >
              <div className="text-3xl rounded-full">{flag}</div>
              {name} <span className="ml-auto">{dial_code}</span>
            </MenuItem>
          ))
        )}
      </MenuList>
      </label>
    
  );
}
