import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { quotationService } from "../services/quotationService";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MUTATION_KEYS } from "../api/mutationKeys";

const deleteQuotation = quotationService.deleteQuotation;

const useDeleteQuotation = (): UseMutationResult<void, Error, string, unknown> => {
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: (quotationId: string) => deleteQuotation(quotationId),
        onSuccess: () => {
            handleOpenNotification("Cotización eliminada exitosamente.", 'success');

            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        onError: () => {
            handleOpenNotification("Error eliminado la cotización.", 'error');

            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        mutationKey: MUTATION_KEYS.quotation.deleteQuotation,
        retry: false
    });
};

export default useDeleteQuotation;