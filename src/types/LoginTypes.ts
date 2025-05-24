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
    username: string;
    password: string;
    rememberme: boolean;
}

export type { LoginRequest, LoginResponse, LoginFormInputs };