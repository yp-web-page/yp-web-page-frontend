import { create } from 'zustand';
import { getCustomerToken, clearCustomerToken } from '../api/customerClient';
import { serviceCustomer } from '../services/serviceCustomer';
import type { LoginFormInputs } from '../types/LoginTypes';

interface AuthState {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    setAuthenticated: (value: boolean) => void;
    login: (data: LoginFormInputs) => void;
    logout: () => void;
    init: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    isAuthLoading: true,

    // Called once on app mount to hydrate state from localStorage.
    init: () => {
        const token = getCustomerToken();
        set({ isAuthenticated: !!token, isAuthLoading: false });
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
