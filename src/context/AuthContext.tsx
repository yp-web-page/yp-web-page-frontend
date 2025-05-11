import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginFormInputs } from '../types/LoginTypes';
import { useLogin } from '../hooks/useLogin';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (data: LoginFormInputs) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { mutate } = useLogin();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const login = (data: LoginFormInputs) => {
        if (!data.username || !data.password || isAuthenticated) return;

        mutate({
            params: {username: data.username, password: data.password}
        });
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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