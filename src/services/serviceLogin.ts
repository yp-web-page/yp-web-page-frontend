import { LoginResponse, LoginRequest } from '../types/LoginTypes';
import {API_ENDPOINTS} from "../api/endpoints";
import apiClient from "../api/axios";

/**
 * Log in a user with credentials
 */
const login = async (loginParams: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post(
        API_ENDPOINTS.user.loginUser,
        { username: loginParams.username, password: loginParams.password }
    );

    return response.data as LoginResponse;
};

export const authService = {
    login,
};