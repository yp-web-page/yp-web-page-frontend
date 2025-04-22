import { LoginResponse } from '../types/LoginTypes';

// API URL - replace with your actual backend URL or environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Log in a user with credentials
 */
const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Login failed'
            };
        }
        
        // Store token in localStorage
        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }
        
        return {
            ...data,
            success: true
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'An error occurred during login'
        };
    }
};

export const authService = {
    login,
};