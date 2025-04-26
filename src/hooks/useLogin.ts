import { useQuery, UseQueryResult } from 'react-query';
import { authService } from '../services/serviceLogin';
import { QUERY_KEYS } from '../constants/queryKeys';
import { LoginRequest } from '../types/LoginTypes';

// Assuming these types exist or need to be defined
interface LoginResponse {
    user: {
        id: string;
        username: string;
        // other user properties
    };
    token: string;
}

export const useLogin = (params: LoginRequest): UseQueryResult<LoginResponse, Error> => {
    return useQuery<LoginResponse, Error, LoginResponse, [string, LoginRequest]>({
        queryKey: [QUERY_KEYS.auth.login, params],
        queryFn: () => authService.login(params.username, params.password),
        staleTime: 1000 * 60 * 60 * 2, // 2 hours
        gcTime: 1000 * 60 * 60 * 2, // 2 hours
        enabled: false, // Only run the query when needed, not on component mount
    });
};