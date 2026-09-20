import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { serviceCustomer } from '../services/serviceCustomer';

type OnLoginSuccess = () => void;

interface LoginErrorResponse {
    error: string;
    remainingAttempts?: number;
    lockoutMinutes?: number;
    retryAfter?: number;
}

export interface LoginErrorInfo {
    message: string;
    type: 'invalid_credentials' | 'account_locked' | 'too_many_requests' | 'email_not_verified' | 'account_disabled' | 'unknown';
}

function parseLoginError(error: AxiosError<LoginErrorResponse>): LoginErrorInfo {
    const data = error.response?.data;
    const status = error.response?.status;

    if (status === 429 && data?.error === 'account_locked') {
        const minutes = Math.ceil((data.retryAfter ?? 0) / 60);
        return {
            type: 'account_locked',
            message: `Cuenta bloqueada por demasiados intentos fallidos. Intenta de nuevo en ${minutes} minuto${minutes !== 1 ? 's' : ''}.`,
        };
    }

    if (status === 429) {
        return {
            type: 'too_many_requests',
            message: 'Demasiados intentos seguidos. Espera un momento antes de intentar de nuevo.',
        };
    }

    if (status === 403 && data?.error === 'account_disabled') {
        return {
            type: 'account_disabled',
            message: 'Tu cuenta está desactivada. Comunícate con el administrador para reactivarla.',
        };
    }

    if (status === 403 && data?.error === 'email_not_verified') {
        return {
            type: 'email_not_verified',
            message: 'Tu cuenta no está activada. Te enviamos un nuevo enlace de activación a tu correo.',
        };
    }

    if (status === 401 && data?.remainingAttempts !== undefined) {
        if (data.remainingAttempts === 0) {
            return {
                type: 'account_locked',
                message: `Contraseña incorrecta. Cuenta bloqueada por ${data.lockoutMinutes} minutos.`,
            };
        }
        if (data.remainingAttempts === 1) {
            return {
                type: 'invalid_credentials',
                message: 'Contraseña incorrecta. Te queda 1 intento antes de que la cuenta se bloquee por 15 minutos.',
            };
        }
        return {
            type: 'invalid_credentials',
            message: `Contraseña incorrecta. Te quedan ${data.remainingAttempts} intentos.`,
        };
    }

    return {
        type: 'unknown',
        message: 'Correo o contraseña incorrectos.',
    };
}

const useCustomerLogin = (onSuccessCallback?: OnLoginSuccess) => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            serviceCustomer.loginCustomer(email, password),
        onSuccess: () => {
            onSuccessCallback?.();
        },
        throwOnError: false,
        retry: false,
        meta: { parseError: parseLoginError },
    });
};

export { useCustomerLogin, parseLoginError };
