import { useMutation } from '@tanstack/react-query';
import { serviceCustomer, type RegisterCustomerParams } from '../services/serviceCustomer';
import { TypeNotification } from '../types/TypeNotifcation';
import { useModal } from '../context/ModalContext';
import { MUTATION_KEYS } from '../api/mutationKeys';

const useRegisterUser = () => {
    const { openModal, closeModal } = useModal();

    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal('notification', message, typeNotification);
    };

    return useMutation({
        mutationFn: ({ user }: { user: RegisterCustomerParams }) =>
            serviceCustomer.registerCustomer(user),
        onSuccess: () => {
            handleOpenNotification(
                'Usuario registrado. Ya puedes iniciar sesión.',
                'success',
            );
            setTimeout(() => closeModal(), 5000);
        },
        onError: () => {
            handleOpenNotification('Error registrando el usuario.', 'error');
            setTimeout(() => closeModal(), 5000);
        },
        mutationKey: MUTATION_KEYS.user.registerUser,
        retry: false,
    });
};

export default useRegisterUser;
