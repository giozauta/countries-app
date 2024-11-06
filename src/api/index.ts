import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
};

export const httpClient = axios.create(axiosConfig);
