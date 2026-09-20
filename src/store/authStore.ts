import { create } from 'zustand';
import { serviceCustomer } from '../services/serviceCustomer';
import type { LoginFormInputs } from '../types/LoginTypes';

const AUTH_CHANNEL = 'yanca_auth';

function broadcastAuth(type: 'login' | 'logout') {
    try {
        const ch = new BroadcastChannel(AUTH_CHANNEL);
        ch.postMessage({ type });
        ch.close();
    } catch {
        // BroadcastChannel not available (e.g. old browsers) — cross-tab sync degrades gracefully.
    }
}

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
        serviceCustomer.getCustomerProfile()
            .then(() => set({ isAuthenticated: true, isAuthLoading: false }))
            .catch(() => set({ isAuthenticated: false, isAuthLoading: false }));
    },

    /**
     * Returns a cleanup function — call it in useEffect's return to avoid
     * duplicate listeners (React StrictMode runs effects twice in development).
     */
    startCrossTabSync: () => {
        let channel: BroadcastChannel | null = null;
        try {
            channel = new BroadcastChannel(AUTH_CHANNEL);
            channel.onmessage = ({ data }: MessageEvent<{ type: 'login' | 'logout' }>) => {
                if (data.type === 'logout') useAuthStore.setState({ isAuthenticated: false });
                if (data.type === 'login') useAuthStore.setState({ isAuthenticated: true });
            };
        } catch {
            // BroadcastChannel not supported — degrade gracefully.
        }
        return () => channel?.close();
    },

    setAuthenticated: (value: boolean) => {
        set({ isAuthenticated: value });
        if (value) broadcastAuth('login');
    },

    login: (data: LoginFormInputs) => {
        if (!data.email || !data.password || get().isAuthenticated) return;
        serviceCustomer.loginCustomer(data.email, data.password).then(() => {
            set({ isAuthenticated: true });
            broadcastAuth('login');
        });
    },

    logout: () => {
        serviceCustomer.logoutCustomer().finally(() => {
            set({ isAuthenticated: false });
            broadcastAuth('logout');
        });
    },
}));
