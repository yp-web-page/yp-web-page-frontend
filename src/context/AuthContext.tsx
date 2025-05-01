import { createContext, useContext, useState, ReactNode } from 'react';
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

    const login = (data: LoginFormInputs) => {
        if (data.username && data.password) {
            mutate({
                params: {username: data.username, password: data.password}
            });
            return
        }
        setIsAuthenticated(true);
    };

    const logout = () => {
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