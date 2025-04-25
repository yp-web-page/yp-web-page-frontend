import { useMutation } from "@tanstack/react-query";
import { RecoverPassword } from "../types/RecoverPassword";
import { serviceUser } from "../services/serviceUser";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MESSAGE } from "../constants/message";

const useRecoverPassword = () => {

    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
            openModal("notification", message, typeNotification);
        };

    return useMutation({
        mutationFn: ({ recoverPassword }: { recoverPassword: RecoverPassword }) => 
            serviceUser.recoverPassword(recoverPassword),
        onSuccess: () => {
            handleOpenNotification(MESSAGE.SUCCESSFUL_PASSWORD_RECOVERY, 'success');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        onError: () => {
            handleOpenNotification(MESSAGE.ERROR_PASSWORD_RECOVERY, 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        mutationKey: MUTATION_KEYS.user.recoverPassword,
        retry: false,
    });
};

export default useRecoverPassword;