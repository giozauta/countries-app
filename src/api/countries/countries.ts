import { httpClient } from "..";
import { CountryType } from "./countries.types";

export const getCountries = async (): Promise<CountryType[] | undefined> => {
  try {
    const response = await httpClient.get(`/countries`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("The response data is not an array.");
    }
  } catch (err) {
    throw new Error(
      `${err} Failed to fetch countries. Please check your network connection.`,
    );
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
