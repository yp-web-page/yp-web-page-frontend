import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ActiveRegularAccount } from "../types/ActiveRegularAccount";
import { serviceUser } from "../services/serviceUser";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MESSAGE } from "../constants/message";
import { MUTATION_KEYS } from "../api/mutationKeys";

interface ActiveRegularAccountProps {
    navigate: (path: string) => void;
}

const useActiveRegularAccount = ({ navigate }: ActiveRegularAccountProps): UseMutationResult<string, Error, { activeRegularAccount: ActiveRegularAccount }, unknown> => {
    
    const { openModal, closeModal } = useModal();
        const handleOpenNotification = (message: string, typeNotification: TypeNotification) => 
            openModal("notification", message, typeNotification);

    return useMutation({
        mutationFn: ({ activeRegularAccount }: {activeRegularAccount: ActiveRegularAccount}) => 
            serviceUser.activeRegularAccount(activeRegularAccount),
        onSuccess: () => {
            navigate('/');
            handleOpenNotification(MESSAGE.SUCCESSFUL_ACTIVATION_ACCOUNT, 'success');
            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        onError: () => {
            handleOpenNotification(MESSAGE.ERROR_ACTIVATION_ACCOUNT, 'error');
            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        mutationKey: MUTATION_KEYS.user.activeRegularAccount,
        retry: false,
    });
}

export default useActiveRegularAccount;