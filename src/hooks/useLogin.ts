import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { authService } from '../services/serviceLogin';
import { LoginRequest, LoginResponse } from '../types/LoginTypes';
import { TypeNotification } from "../types/TypeNotifcation";
import { useModal } from "../context/ModalContext";
import { MESSAGE } from "../constants/message";

const useLogin = () => {

    const { openModal, closeModal } = useModal();
        const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
            openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: ({ params }: {params: LoginRequest}) => authService.login(params),
        onSuccess: (data) => {
            handleOpenNotification(MESSAGE.LOGIN_SUCCESS, 'success')
            setTimeout(() => {
                closeModal();
            }
            , 5000)
            if (data) {
                localStorage.setItem("token", data.token);
            }
        },
        onError: () => {
            handleOpenNotification(MESSAGE.LOGIN_ERROR, 'error')
            setTimeout(() => {
                closeModal();
            }
            , 5000)
        },
    });
};

export { useLogin };