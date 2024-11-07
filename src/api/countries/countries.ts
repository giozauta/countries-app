import { httpClient } from "..";
import { CountryType } from "./countries.types";


export const getCountries = async (): Promise<CountryType[] | undefined> => {
  try {
    const response = await httpClient.get<CountryType[]>("/countries");
    return response.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// delete country by ID
export const deleteCountry = async (
  id: string,
): Promise<CountryType | undefined> => {
  try {
    const response = await httpClient.delete<CountryType>(`/countries/${id}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// update country
export const updateCountry = async ({
  id,
  payload,
}: {
  id: string;
  payload: CountryType;
}): Promise<CountryType | undefined> => {
  try {
    const response = await httpClient.patch<CountryType>(
      `/countries/${id}`,
      payload,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// update country vote
export const updateCountryVote = async ({
  id,
  payload,
}: {
  id: string;
  payload: { vote: number };
}): Promise<CountryType | undefined> => {
  try {
    const response = await httpClient.patch<CountryType>(
      `/countries/${id}`,
      payload,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Add a new country
export const addCountry = async ({
  payload,
}: {
  payload: CountryType;
}): Promise<CountryType | undefined> => {
  try {
    const response = await httpClient.post<CountryType>("/countries", payload);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};