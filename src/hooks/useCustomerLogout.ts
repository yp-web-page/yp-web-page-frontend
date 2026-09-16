import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceCustomer } from '../services/serviceCustomer';

const useCustomerLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => serviceCustomer.logoutCustomer(),
        onSettled: () => {
            // Clear all customer-related cached queries on logout.
            queryClient.removeQueries({ queryKey: ['customer'] });
        },
        retry: false,
    });
};

export { useCustomerLogout };
