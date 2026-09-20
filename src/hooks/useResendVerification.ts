import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { serviceCustomer } from '../services/serviceCustomer';

export type ResendResult = 'sent' | 'already_verified' | 'too_many' | 'error';

const useResendVerification = () => {
    return useMutation({
        mutationFn: async (email: string): Promise<ResendResult> => {
            const response = await serviceCustomer.resendVerificationEmail(email);
            return response === 'already_verified' ? 'already_verified' : 'sent';
        },
        retry: false,
        onError: (error: unknown) => {
            if (error instanceof AxiosError && error.response?.status === 429) {
                return 'too_many' as ResendResult;
            }
            return 'error' as ResendResult;
        },
    });
};

export default useResendVerification;
