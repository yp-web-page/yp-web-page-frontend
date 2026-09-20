import { create } from 'zustand';
import { getCustomerToken, clearCustomerToken, CUSTOMER_TOKEN_KEY } from '../api/customerClient';
import { serviceCustomer } from '../services/serviceCustomer';
import type { LoginFormInputs } from '../types/LoginTypes';

interface AuthState {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setAuthenticated: (value: boolean) => void;
    login: (data: LoginFormInputs) => void;
    logout: () => void;
    init: () => void;
    startCrossTabSync: () => () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    isAuthLoading: true,

    init: () => {
        const token = getCustomerToken();
        set({ isAuthenticated: !!token, isAuthLoading: false });
    },

    /**
     * Returns a cleanup function — call it in useEffect's return to avoid
     * duplicate listeners (React StrictMode runs effects twice in development).
     */
    startCrossTabSync: () => {
        const handler = (event: StorageEvent) => {
            if (event.key !== CUSTOMER_TOKEN_KEY) return;
            if (event.newValue) {
                const parts = event.newValue.split('.');
                if (parts.length !== 3) return;
                useAuthStore.setState({ isAuthenticated: true });
            } else {
                useAuthStore.setState({ isAuthenticated: false });
            }
        };
        window.addEventListener('storage', handler);
        // Return cleanup so the caller can remove the listener.
        return () => window.removeEventListener('storage', handler);
    },

    setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

    login: (data: LoginFormInputs) => {
        if (!data.email || !data.password || get().isAuthenticated) return;
        serviceCustomer.loginCustomer(data.email, data.password).then(() => {
            set({ isAuthenticated: true });
        });
    },

    logout: () => {
        serviceCustomer.logoutCustomer().finally(() => {
            clearCustomerToken();
            set({ isAuthenticated: false });
        });
    },
}));
