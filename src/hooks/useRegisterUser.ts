import { useMutation } from "@tanstack/react-query";
import { serviceUser } from "../services/serviceUser";
import RegisterUser from "../types/RegisterUser";
import { TypeNotification } from "../types/TypeNotifcation";
import { useModal } from "../context/ModalContext";

const useRegisterUser = () => {

    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: ({ user, file }: { user: RegisterUser; file?: File }) => 
            serviceUser.registerUser({ user, file }),
        onSuccess: () => {
            handleOpenNotification("Usuario registrado, pero la cuenta se debe activar desde el email.", 'success');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
            
        },
        onError: (error) => {
            console.error("Error registering user:", error);
            handleOpenNotification("Error registrando el usuario.", 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
    });
};

export default useRegisterUser;