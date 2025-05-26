import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginFormInputs } from '../types/LoginTypes';
import { useLogin } from '../hooks/useLogin';
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
    const { mutate } = useLogin(() => setIsAuthenticated(true))

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsAuthLoading(false);
    }, []);

    // Listen for the custom event 'unauthorized' to handle logout
    // This event should be dispatched from the axios interceptor in case of 401 error
    // This is a workaround to handle unauthorized access globally
    useEffect(() => {
        const handleUnauthorized = () => {
            logout();
        };

        const handleForbidden = () => {
            openModal("notification", "No tienes permisos para acceder a este recurso.", "error");
          };

        window.addEventListener('unauthorized', handleUnauthorized);
        window.addEventListener('forbidden', handleForbidden);
        return () => {
            window.removeEventListener('unauthorized', handleUnauthorized); 
            window.removeEventListener('forbidden', handleForbidden);
        };
    }, []);

    const login = (data: LoginFormInputs) => {
        if (!data.username || !data.password || isAuthenticated) return;

        mutate({
            params: {username: data.username, password: data.password, rememberme: data.rememberme}
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
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