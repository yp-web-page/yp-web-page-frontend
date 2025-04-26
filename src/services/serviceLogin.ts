import { LoginResponse, LoginRequest } from '../types/LoginTypes';
import {API_ENDPOINTS} from "../api/endpoints";
import apiClient from "../api/axios";

/**
 * Log in a user with credentials
 */
const login = async (loginParams: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post(
            API_ENDPOINTS.user.loginUser,
            { username: loginParams.username, password: loginParams.password }
        );

        const data = await response.data();
        
        if (response.status !== 200) {
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