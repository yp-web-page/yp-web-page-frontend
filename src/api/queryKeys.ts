import { LoginRequest } from "../types/LoginTypes";

export const QUERY_KEYS = {
    carousel: {
        images: ['carousel-images'] as [string],
    },
    auth: {
        login: ['auth-login', {username: '', password: ''}] as [string, LoginRequest],
    },
};