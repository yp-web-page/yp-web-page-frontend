import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { ChangePassword } from "../types/ChangePassword"
import { serviceUser } from "../services/serviceUser"
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { MESSAGE } from "../constants/message";

interface ChangePasswordProps{
    navigate: (path: string) => void;
}

const useChangePassword = ({ navigate }: ChangePasswordProps): UseMutationResult<string, Error, { changePassword: ChangePassword}, unknown> => {

    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => 
        openModal("notification", message, typeNotification);

    return useMutation({
        mutationFn: ({changePassword}: {changePassword: ChangePassword}) => 
            serviceUser.changePassword(changePassword),
        onSuccess: () => {
            navigate('/');
            handleOpenNotification(MESSAGE.PASSWORD_CHANGED_SUCCESSFULLY, 'success');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        onError: () => {
            handleOpenNotification(MESSAGE.ERROR_PASSWORD_CHANGE, 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        mutationKey: MUTATION_KEYS.user.changePassword,
        retry: false,
    })
}

export default useChangePassword;