import React, { useState, useEffect } from "react";
import { Menu } from "../Menu/Menu";
import { FormFieldWithMenu } from "./FormFieldWithMenu";

interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export default function PhoneFormField() {
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
        console.log(data);
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
        errorMessage={error}
        loading={loading}
      />
    </Menu>
  );
}
