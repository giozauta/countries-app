import { httpClient } from "..";
import { CountryType } from "./countries.types";

export const getCountries = async (sort: string): Promise<CountryType[]> => {
  try {
    const response = await httpClient.get(
      `/countries?_sort=vote&_order=${sort}`,
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `${err} Failed to fetch countries. Please check your network connection.`,
    );
  }
};

export const singleCountry = async (id: string | undefined) => {
  if (!id) {
    throw new Error("ID is required");
  }
  try {
    const response = await httpClient.get(`/countries/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(
      `${err} Failed to fetch countries. Please check your network connection.`,
    );
  }
};

// delete country by ID
export const deleteCountry = async (id: string): Promise<CountryType> => {
  try {
    const response = await httpClient.delete<CountryType>(`/countries/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(
      err + "Failed to delete countries. Please check your network connection.",
    );
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
    throw new Error(
      err + "Failed to update country. Please check your network connection.",
    );
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
    throw new Error(
      err + "Failed to update vote. Please check your network connection.",
    );
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
    throw new Error(
      err + "Failed to addCountry. Please check your network connection.",
    );
  }
};
