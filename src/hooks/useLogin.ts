import { useMutation } from "@tanstack/react-query";
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
        onSuccess: (data: LoginResponse) => {
            handleOpenNotification(MESSAGE.LOGIN_SUCCESS, 'success')
            setTimeout(() => {
                closeModal();
            }
            , 5000)
            if (data) {
                console.log("Login successful", data);
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", data.username)
                localStorage.setItem("role", data.role)
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