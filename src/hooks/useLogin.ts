import { useMutation } from "@tanstack/react-query";
import { authService } from '../services/serviceLogin';
import { LoginRequest, LoginResponse } from '../types/LoginTypes';
import { TypeNotification } from "../types/TypeNotifcation";
import { useModal } from "../context/ModalContext";
import { MESSAGE } from "../constants/message";

type OnLoginSuccess = () => void;

const useLogin = (onSuccessCallBack?: OnLoginSuccess) => {

    const { openModal, closeModal } = useModal();
        const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
            openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: ({ params }: {params: LoginRequest}) => authService.login(params),
        onSuccess: (data: LoginResponse, variables) => {
            handleOpenNotification(MESSAGE.LOGIN_SUCCESS, 'success')
            setTimeout(() => {
                closeModal();
            }
            , 5000);
            if (data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.username);
                localStorage.setItem("role", data.role);

                 if (variables.params.rememberme) {
                    localStorage.setItem('rememberedUsername', data.username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }
            }
            // to set the user as authenticated, only if the login was successful.
            onSuccessCallBack?.();
        },
        onError: (_, variables) => {
            handleOpenNotification(MESSAGE.LOGIN_ERROR, 'error')
            setTimeout(() => {
                closeModal();
            }
            , 5000);
            if (!variables.params.rememberme) {
                localStorage.removeItem('rememberedUsername');
            }
        },
    });
};

export { useLogin };