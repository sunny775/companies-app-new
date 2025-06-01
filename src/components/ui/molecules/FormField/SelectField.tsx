import Label, { LabelProps } from "@/components/ui/atoms/Label";
import Select from "@/components/ui/atoms/Select";
import cn from "@/lib/utils/cn";
import { splitCamelPascalCase } from "@/lib/utils/splitCamelCasePascalCase";
import { useId, useState } from "react";
import { getNestedFieldName } from "./FormField";

interface Option {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id?: string;
  name: string;
  options: Option[];
  value?: string;
  placeholder?: string;
  labelProps?: LabelProps;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export default function SelectField({
  id,
  name,
  value,
  options,
  error,
  success,
  placeholder,
  errorMessage,
  labelProps,
  onChange,
}: SelectFieldProps) {
  const [query, setQuery] = useState("");

  const data = options.filter((option) => option.value.toLowerCase().includes(query.toLowerCase()));

  const defaultId = useId();

  id = id ?? defaultId;

  error = error ?? !!errorMessage;

  return (
    <>
      <div className="flex items-center gap-2 my-2">
        <Label htmlFor={id} {...labelProps}>
          {labelProps?.children || splitCamelPascalCase(getNestedFieldName(name))}
        </Label>
        <span
          className={cn("invisible text-amber-600 text-xs font-extralight", {
            visible: error,
          })}
        >
          {errorMessage}
        </span>
      </div>
      <Select
        id={id}
        defaultValue={value}
        searchQuery={query}
        setSearchQuery={setQuery}
        filteredOptions={data.map((option) => option.value)}
        onChange={onChange}
      >
        <Select.Trigger color={error ? "error" : success ? "success" : "default"}>
          {placeholder || "Select an option"}
        </Select.Trigger>

        <Select.Dropdown>
          <Select.Input />
          <Select.List>
            {data.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.List>
        </Select.Dropdown>
      </Select>
    </>
  );
}
