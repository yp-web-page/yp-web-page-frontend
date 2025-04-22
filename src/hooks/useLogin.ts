import { useQuery, UseQueryResult } from 'react-query';
import { authService } from '../services/serviceLogin';
import { QUERY_KEYS } from '../constants/queryKeys';

// Assuming these types exist or need to be defined
interface LoginResponse {
    user: {
        id: string;
        username: string;
        // other user properties
    };
    token: string;
}

interface LoginParams {
    username: string;
    password: string;
}

export const useLogin = (params: LoginParams): UseQueryResult<LoginResponse, Error> => {
    return useQuery<LoginResponse, Error, LoginResponse, [string, LoginParams]>({
        queryKey: [QUERY_KEYS.auth.login, params],
        queryFn: () => authService.login(params),
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60, // 1 hour
        enabled: false, // Only run the query when needed, not on component mount
    });
};