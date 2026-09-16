interface LoginRequest {
    username: string;
    password: string;
    rememberme: boolean;
}

interface LoginResponse {
    token: string
    username: string
    role: string
}

interface LoginFormInputs {
    email: string;
    password: string;
    rememberme: boolean;
}

export type { LoginRequest, LoginResponse, LoginFormInputs };