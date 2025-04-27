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

interface LoginFormInputs {
    username: string;
    password: string;
    rememberme: boolean;
}

export type { LoginRequest, LoginResponse, LoginFormInputs };