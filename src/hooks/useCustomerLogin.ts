import { useMutation } from '@tanstack/react-query';
import { serviceCustomer } from '../services/serviceCustomer';
import { TypeNotification } from '../types/TypeNotifcation';
import { useModal } from '../context/ModalContext';
import { MESSAGE } from '../constants/message';

type OnLoginSuccess = () => void;

const useCustomerLogin = (onSuccessCallback?: OnLoginSuccess) => {
    const { openModal, closeModal } = useModal();

    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal('notification', message, typeNotification);
    };

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            serviceCustomer.loginCustomer(email, password),
        onSuccess: () => {
            handleOpenNotification(MESSAGE.LOGIN_SUCCESS, 'success');
            setTimeout(() => closeModal(), 5000);
            onSuccessCallback?.();
        },
        onError: () => {
            handleOpenNotification(MESSAGE.LOGIN_ERROR, 'error');
            setTimeout(() => closeModal(), 5000);
        },
        retry: false,
    });
};

export { useCustomerLogin };
