import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginFormInputs } from '../types/LoginTypes';
import { useCustomerLogin } from '../hooks/useCustomerLogin';
import { useCustomerLogout } from '../hooks/useCustomerLogout';
import { getCustomerToken, clearCustomerToken } from '../api/customerClient';
import { useModal } from './ModalContext';

interface AuthContextType {
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    login: (data: LoginFormInputs) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const { openModal } = useModal();
    const { mutate: loginMutate } = useCustomerLogin(() => setIsAuthenticated(true));
    const { mutate: logoutMutate } = useCustomerLogout();

    useEffect(() => {
        const token = getCustomerToken();
        setIsAuthenticated(!!token);
        setIsAuthLoading(false);
    }, []);

    useEffect(() => {
        const handleUnauthorized = () => logout();
        const handleForbidden = () =>
            openModal('notification', 'No tienes permisos para acceder a este recurso.', 'error');

        window.addEventListener('customer:unauthorized', handleUnauthorized);
        window.addEventListener('forbidden', handleForbidden);
        return () => {
            window.removeEventListener('customer:unauthorized', handleUnauthorized);
            window.removeEventListener('forbidden', handleForbidden);
        };
    }, []);

    const login = (data: LoginFormInputs) => {
        if (!data.email || !data.password || isAuthenticated) return;
        loginMutate({ email: data.email, password: data.password });
    };

    const logout = () => {
        logoutMutate(undefined, {
            onSettled: () => {
                clearCustomerToken();
                setIsAuthenticated(false);
            },
        });
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAuthLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
