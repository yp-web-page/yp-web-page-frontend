import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { UpdateUser } from "../types/UpdateUser";
import { serviceUser } from "../services/serviceUser";
import { MESSAGE } from "../constants/message";
import { QUERY_KEYS } from "../api/queryKeys";

const useUpdateUser = () => {

    const queryClient = useQueryClient();
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => 
            openModal("notification", message,    typeNotification);

    return useMutation({
        mutationFn: (payload: UpdateUser) => serviceUser.updateUserProfile(payload),
        onSuccess: () => {
            handleOpenNotification(MESSAGE.UPDATE_PROFILE_SUCCESS, 'success');
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.getUserProfile });
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        onError: () => {
            handleOpenNotification(MESSAGE.ERROR_UPDATE_PROFILE, 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
    });
};

export { useUpdateUser };