import { COUNTRIES_DIAL_CODE_AND_FLAG_URL, COUNTRY_STATES_URL } from "@/lib/constants";

export interface Country {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export interface State {
  name: string;
  state_code: string;
}

export interface CountryStates {
  name: string;
  iso3: string;
  states: State[];
}

export default function countriesApiError(error: unknown) {
  let errorMessage = "Error fetching countries data";

  if (error instanceof Error) {
    errorMessage = error.message;
  }
  return new Error(errorMessage);
}

export async function getCountries() {
  try {
    const response = await fetch(COUNTRIES_DIAL_CODE_AND_FLAG_URL);

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data: Country[] = await response.json();

    return { data };
  } catch (error) {
    return { error: countriesApiError(error) };
  }
}

export async function getCountryStates(stateName: string) {
  try {
    const response = await fetch(COUNTRY_STATES_URL(stateName.toLowerCase().replace(/\s+/g, '_')));

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const data: CountryStates = await response.json();

    return { data };
  } catch (error) {
    return { error: countriesApiError(error) };
  }
}
