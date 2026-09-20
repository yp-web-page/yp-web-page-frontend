import { useMutation } from '@tanstack/react-query';
import { serviceCustomer, type RegisterCustomerParams } from '../services/serviceCustomer';
import { MUTATION_KEYS } from '../api/mutationKeys';

const useRegisterUser = () => {
    return useMutation({
        mutationFn: ({ user }: { user: RegisterCustomerParams }) =>
            serviceCustomer.registerCustomer(user),
        mutationKey: MUTATION_KEYS.user.registerUser,
        retry: false,
    });
};

export default useRegisterUser;
