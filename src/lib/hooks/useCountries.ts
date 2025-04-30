import countriesApiError, { Country, getCountries } from "@/app/actions/countries.actions";
import { useEffect, useState } from "react";

export default function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const { data, error } = await getCountries();
        if (error) throw error;

        setCountries(data);
      } catch (error) {
        setError(countriesApiError(error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { countries, loading, error };
}
