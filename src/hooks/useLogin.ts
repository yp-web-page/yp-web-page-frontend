import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { authService } from '../services/serviceLogin';
import { LoginRequest, LoginResponse } from '../types/LoginTypes';
import { TypeNotification } from "../types/TypeNotifcation";
import { useModal } from "../context/ModalContext";

const useLogin = () => {

    const { openModal, closeModal } = useModal();
        const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
            openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: ({ params }: {params: LoginRequest}) => authService.login(params),
        onSuccess: (data) => {
            console.log("Login successful:", data);
            handleOpenNotification("Login exitoso", 'success')
            setTimeout(() => {
                closeModal();
            }
            , 5000)
            if (data) {
                localStorage.setItem("token", data.token);
            }
        },
        onError: (error: Error) => {
            console.error("Error logging in:", error);
            handleOpenNotification("Error en el log-in del usuario", 'error')
            setTimeout(() => {
                closeModal();
            }
            , 5000)
        },
    });
};

export { useLogin };