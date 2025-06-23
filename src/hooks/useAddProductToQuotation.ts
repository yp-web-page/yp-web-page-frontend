import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { quotationService } from "../services/quotationService";
import { AddProductToQuotationRequest } from "../types/Quotation";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { QUERY_KEYS } from "../api/queryKeys";

interface ProductToQuotationProps {
    onCloseQuotationModal: () => void;
    username: string;
}

const addProductToQuotation = quotationService.addProductToQuotation;

const useAddProductToQuotation = ({ onCloseQuotationModal, username }: ProductToQuotationProps): UseMutationResult<void, Error, AddProductToQuotationRequest, unknown> => {
    const queryClient = useQueryClient();
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: (addProductToQuotationRequest: AddProductToQuotationRequest) => addProductToQuotation(addProductToQuotationRequest),
        onSuccess: () => {
            onCloseQuotationModal();
            handleOpenNotification("Producto agregado a la cotización.", 'success');

            queryClient.invalidateQueries({
                queryKey: [...QUERY_KEYS.quotations.getAllQuotation, username],
            });

            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        onError: () => {
            handleOpenNotification("Error añadiendo el producto a la cotización.", 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        mutationKey: MUTATION_KEYS.quotation.addProductToQuotation,
        retry: false
    });
};

export default useAddProductToQuotation;