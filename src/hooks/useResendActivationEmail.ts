import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { serviceEmail } from "../services/serviceEmail";
import { ActiveRegularAccount } from "../types/ActiveRegularAccount";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { MESSAGE } from "../constants/message";

interface ResendActivationEmailProps {
    navigate: (path: string) => void;
}

const userResendActivationEmail = ({ navigate }: ResendActivationEmailProps): UseMutationResult<string, Error, { activeRegularAccount: ActiveRegularAccount }, unknown> => {
    
     const { openModal, closeModal } = useModal();
            const handleOpenNotification = (message: string, typeNotification: TypeNotification) => 
                openModal("notification", message, typeNotification);
    
    return useMutation({
        mutationFn: ({ activeRegularAccount }: { activeRegularAccount: ActiveRegularAccount }) => 
            serviceEmail.activeRegularAccount(activeRegularAccount),
        onSuccess: () => {
            navigate('/');
            handleOpenNotification(MESSAGE.SUCCESSFUL_RESEND_ACTIVATION_ACCOUNT, 'success');
            setTimeout(() => {  
                closeModal();
            }
            , 5000);
        },
        onError: () => {
            handleOpenNotification(MESSAGE.ERROR_RESEND_ACTIVATION_ACCOUNT, 'error');
            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        mutationKey: MUTATION_KEYS.email.resendActivationEmail,
        retry: 1,
    });
}

export default userResendActivationEmail;