import React, { useState, useEffect } from "react";
import { Menu } from "../Menu/Menu";
import { FormFieldWithMenu } from "./FormFieldWithMenu";
import { FormFieldProps } from "../CreateCompanyForm/FormField";
import { FieldValues, Path } from "react-hook-form";

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

interface Props<T extends FieldValues> extends Omit<FormFieldProps<T>, "type"> {
  reset: (field: Path<T>) => void;
}

export default function PhoneFormField<T extends FieldValues>(props: Props<T>) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setError(error.message);
        } else {
          setError("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  return (
    <Menu>
      <FormFieldWithMenu
        countries={countries}
        apiError={error}
        loading={loading}
        {...props}
      />
    </Menu>
  );
}
