import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
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

interface Props<T extends FieldValues> extends Omit<FormFieldProps<T>, "type"> {
  dialCode?: string;
  setDialCode: (value: string) => void;
  dialCodeError?: boolean;
  dialCodeErrorMessage?: string;
}

export default function PhoneField<T extends FieldValues>({
  id,
  name,
  options,
  register,
  error,
  //reset,
  dialCode,
  setDialCode,
  dialCodeError,
  errorMessage,
  dialCodeErrorMessage,
  placeholder,
  labelProps,
  ...rest
}: Props<T>) {
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
            visible: error || dialCodeError,
          })}
        >
          {errorMessage || dialCodeErrorMessage}
        </span>
      </div>
      <div className="flex">
        <Select
          defaultValue={dialCode}
          searchQuery={query}
          setSearchQuery={setQuery}
          filteredOptions={data.map((country) => country.dial_code)}
          onChange={(value) => setDialCode(value)}
        >
          <Select.Trigger color={dialCodeError ? "error" : "default"} className="w-26 rounded-r-none  border-r-0">
            {dialCode || "Dial Code"}
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
                    // reset(name);
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
        <Input
          id={id}
          {...rest}
          type="tel"
          {...register(name, {
            ...options,
          })}
          placeholder={placeholder || splitCamelPascalCase(getNestedFieldName(name))}
          error={error}
          className="rounded-l-none"
        />
      </div>
    </div>
  );
}
