import Input from "@/components/atoms/Input";
import Label, { LabelProps } from "@/components/atoms/Label";
import Select, { SelectRootProps } from "@/components/atoms/Select";
import cn from "@/lib/cn";
import { splitCamelPascalCase } from "@/lib/splitCamelCasePascalCase";
import { useEffect, useId, useState } from "react";
import { FieldValues } from "react-hook-form";
import { FormFieldProps, getNestedFieldName } from "./FormField";

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

interface Props extends SelectRootProps {
    name: string;
    setValue: (value: string) => void;
   value?: string;
   placeholder?:string;
   labelProps?: LabelProps;
   error?: boolean;
   success?: boolean;
  errorMessage?: string;
}

export default function SelectField({
  id,
  name,
  value,
  setValue,
  error,
  success,
  placeholder,
  errorMessage,
  labelProps,
  ...rest
}: Props) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [, setLoading] = useState(true);
  const [, setApiError] = useState<string | null>(null);

  const [query, setQuery] = useState("");

  const data = countries.filter((country) => country.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/sunny775/countriesData/refs/heads/main/countries.json"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const defaultId = useId();

  id = id ?? defaultId;

  error = error ?? !!errorMessage;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
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
          defaultValue={value}
          searchQuery={query}
          setSearchQuery={setQuery}
          filteredOptions={data.map((country) => country.dial_code)}
          onChange={(value) => setValue(value)}
        >
          <Select.Trigger color={error ? "error" : success ? "success" : "default"} className="w-26 rounded-r-none  border-r-0">
            {placeholder || "Select an option"}
          </Select.Trigger>

          <Select.Dropdown className="w-64">
            <Select.Input />
            <Select.List>
              {data.map(({ name: countryName, flag, dial_code }) => (
                <Select.Item
                  key={countryName}
                  value={dial_code}
                  onClick={(evt) => {
                    evt.preventDefault();
                  }}
                >
                  <p className="flex items-center gap-2">
                    <span className="text-2xl">{flag}</span>
                    <span className="truncate"> {countryName}</span>
                    <span className="ml-auto">{dial_code}</span>
                  </p>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Dropdown>
        </Select>
    </div>
  );
}
