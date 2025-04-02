import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useMenu } from "../Menu/Menu";
import { MenuList } from "../Menu/MenuList";
import { MenuItem } from "../Menu/MenuItem";
import { splitCamelPascalCase } from "@/lib/splitCamelCasePascalCase";
import {
  FormFieldProps,
  getNestedFieldName,
} from "../CreateCompanyForm/FormField";
import { FieldValues, Path } from "react-hook-form";
import cn from "@/lib/cn";

export type PhoneFormFieldProps<T extends FieldValues> = {
  countries: {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
  }[];
  apiError: string | null;
  loading: boolean;
  reset: (field: Path<T>) => void;
} & Omit<FormFieldProps<T>, "type">;

export function FormFieldWithMenu<T extends FieldValues>({
  countries,
  loading,
  apiError,
  name,
  options,
  register,
  error,
  reset,
  errorMessage,
  placeholder,
}: PhoneFormFieldProps<T>) {
  const { menuOpen, openMenu } = useMenu();

  const [selectedIndex, setSelectedIndex] = useState<number>();
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
      // reset(name)
    } else if (event.key === "Escape") {
      openMenu(false);
    }
  };

  return (
    <label key={name} className={cn("flex flex-col gap-2 w-full")}>
      <div className="flex items-center gap-2">
        <span>{splitCamelPascalCase(getNestedFieldName(name))}</span>
        <p
          className={cn("invisible text-amber-600 text-xs font-extralight", {
            visible: error,
          })}
        >
          {errorMessage}
        </p>
      </div>
      <div className="flex w-full">
        <Button
          type="button"
          onClick={() => openMenu((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className="flex h-10 min-w-16 items-center gap-2 rounded-r-none border border-r-0 pl-3 pr-2 focus:outline-none py-0 shadow-none hover:shadow-none border-black/10 dark:border-white/10"
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
        >
          <div className="text-3xl rounded-full">
            {selectedIndex
              ? countries[selectedIndex]?.flag
              : countries[0]?.flag}
          </div>
          {selectedIndex
            ? countries[selectedIndex]?.dial_code
            : countries[0]?.dial_code}
        </Button>
        <Input
          type="tel"
          {...register(name, {
            ...options,
            setValueAs: (v) =>
              selectedIndex ? countries[selectedIndex]?.dial_code + v : v,
          })}
          placeholder={
            placeholder || splitCamelPascalCase(getNestedFieldName(name))
          }
          className={cn("rounded-l-none px-3 py-2 w-full", {
            "border-red-600/30 dark:border-red-500/20": error,
          })}
        />
      </div>
      <MenuList>
        {loading ? (
          <p>Loading countries...</p>
        ) : apiError ? (
          <p className="text-red-500">{apiError}</p>
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
              className={cn({"focus:bg-green-600/10":index === focusedIndex})}
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
