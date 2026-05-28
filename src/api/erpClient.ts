import axios, { AxiosInstance } from "axios";
import { config } from "../config";

/**
 * Axios client for the ERP public storefront API (catalog: products +
 * categories). Anonymous — no Authorization header. Everything that needs auth
 * (login, profile, quotations, email) keeps using the default `apiClient`
 * pointed at the legacy backend.
 */
const erpClient: AxiosInstance = axios.create({
    baseURL: config.erpBaseURL,
    headers: {
        Accept: "application/json",
    },
    timeout: 10000,
});

export default erpClient;
