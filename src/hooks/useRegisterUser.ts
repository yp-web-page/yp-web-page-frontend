import { useMutation } from "@tanstack/react-query";
import { serviceUser } from "../services/serviceUser";
import RegisterUser from "../types/RegisterUser";
import { TypeNotification } from "../types/TypeNotifcation";
import { useModal } from "../context/ModalContext";
import { MUTATION_KEYS } from "../api/mutationKeys";

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
        onError: () => {
            handleOpenNotification("Error registrando el usuario.", 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        mutationKey: MUTATION_KEYS.user.registerUser,
        retry: false,
    });
};

export default useRegisterUser;