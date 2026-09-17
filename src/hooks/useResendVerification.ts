import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { serviceCustomer } from '../services/serviceCustomer';

const useResendVerification = () => {
    return useMutation({
        mutationFn: (email: string) => serviceCustomer.resendVerificationEmail(email),
        retry: false,
        meta: {
            isTooManyRequests: (error: unknown) =>
                error instanceof AxiosError && error.response?.status === 429,
        },
    });
};

export default useResendVerification;
