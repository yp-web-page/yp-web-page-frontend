interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token?: string;
    user?: any;
    success: boolean;
    message?: string;
}

export type { LoginRequest, LoginResponse };