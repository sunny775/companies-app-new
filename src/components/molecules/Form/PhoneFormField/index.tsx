import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import cn from "@/lib/cn";
import { splitCamelPascalCase } from "@/lib/splitCamelCasePascalCase";
import { useEffect, useId, useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { FormFieldProps, getNestedFieldName } from "../FormField";

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

interface Props<T extends FieldValues> extends Omit<FormFieldProps<T>, "type"> {
  reset: (field: Path<T>) => void;
}

export default function PhoneFormField<T extends FieldValues>({
  id,
  name,
  options,
  register,
  error,
  reset,
  errorMessage,
  placeholder,
  labelProps,
  ...rest
}: Props<T>) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [value, setValue] = useState<string>();
  const [query, setQuery] = useState("");

  // const { selectedOption } = useSelect();

  const data = countries.filter((country) => country.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/sunny775/f6f6c6691e259fb8b432a0718b15410f/raw/449258552611926be9ee7a8b4acc2ed9b2243a97/countries.json"
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
      <div className="flex items-center gap-2 my-3">
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
      <div className="flex">
      <Select
        defaultValue={value}
        searchQuery={query}
        setSearchQuery={setQuery}
        filteredOptions={data.map((country) => country.dial_code)}
        onChange={(value) => setValue(value)}
       
      >
        <Select.Trigger className="flex h-10 w-30 min-w-16 items-center gap-2 rounded-r-none  border-r-0 pl-3 pr-2 focus:outline-none py-0 shadow-none hover:shadow-none">
          Dial Code
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
                  reset(name);
                }}
              >
                <span className="text-3xl rounded-full">{flag}</span>
                {countryName.length > 14 ? countryName.slice(0, 15) + " .." : countryName}{" "}
                <span className="ml-auto">{dial_code}</span>
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
