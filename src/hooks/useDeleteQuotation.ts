import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { quotationService } from "../services/quotationService";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { QUERY_KEYS } from "../api/queryKeys";

interface DeleteQuotationProp {
    username: string;
}

const deleteQuotation = quotationService.deleteQuotation;

const useDeleteQuotation = ({ username }: DeleteQuotationProp): UseMutationResult<void, Error, string, unknown> => {
    const queryClient = useQueryClient();
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: (quotationId: string) => deleteQuotation(quotationId),
        onSuccess: () => {
            handleOpenNotification("Cotización eliminada exitosamente.", 'success');

            queryClient.invalidateQueries({
                queryKey: [...QUERY_KEYS.quotations.getAllQuotation, username],
            });

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