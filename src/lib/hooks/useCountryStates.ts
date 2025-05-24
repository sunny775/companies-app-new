import countriesApiError, { State, getCountryStates } from "@/app/actions/countries.actions";
import { useEffect, useState } from "react";

export default function useCountryStates({ countryName }: { countryName: string }) {
  const [countryStates, setCountryStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const { data, error } = await getCountryStates(countryName);
        if (error) throw error;

        setCountryStates(data.states);
      } catch (error) {
        setError(countriesApiError(error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, [countryName]);

  return { countryStates, loading, error };
}
