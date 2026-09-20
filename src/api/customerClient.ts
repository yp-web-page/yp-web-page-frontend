import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

/**
 * Axios client for authenticated customer endpoints on the ERP storefront.
 * Authentication is handled via httpOnly cookie (customer_session) — the browser
 * attaches it automatically on every request. No token is stored in JS memory.
 */
const customerClient: AxiosInstance = axios.create({
    baseURL: config.erpBaseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});

customerClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Avoid infinite loop: don't trigger logout if the logout call itself returns 401.
        const isLogoutRequest = (error.config?.url as string | undefined)?.includes('/logout');
        if (error.response?.status === 401 && !isLogoutRequest) {
            import('../store/authStore').then(({ useAuthStore }) => {
                useAuthStore.getState().logout();
            });
        }
        return Promise.reject(error);
    },
);

export default customerClient;
