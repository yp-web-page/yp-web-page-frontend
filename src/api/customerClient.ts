import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

const CUSTOMER_TOKEN_KEY = 'customer_token';

export function getCustomerToken(): string | null {
    return localStorage.getItem(CUSTOMER_TOKEN_KEY);
}

export function setCustomerToken(token: string): void {
    localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
}

export function clearCustomerToken(): void {
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
}

/**
 * Axios client for authenticated customer endpoints on the ERP storefront.
 * Uses Bearer token from localStorage — completely separate from the legacy
 * apiClient and its session cookie / Java backend token.
 */
const customerClient: AxiosInstance = axios.create({
    baseURL: config.erpBaseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
});

customerClient.interceptors.request.use((cfg) => {
    const token = getCustomerToken();
    if (token) {
        cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
});

customerClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearCustomerToken();
            window.dispatchEvent(new Event('customer:unauthorized'));
        }
        return Promise.reject(error);
    },
);

export default customerClient;
