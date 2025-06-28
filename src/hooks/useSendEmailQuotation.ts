import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { quotationService } from "../services/quotationService";
import { SendEmailQuotationRequest } from "../types/Quotation";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { QUERY_KEYS } from "../api/queryKeys";

interface SendEmailProps {
    username: string;
}

const sendEmailQuotation = quotationService.sendEmailQuotation;

const useSendEmailQuotation = ({ username }: SendEmailProps): UseMutationResult<void, Error, SendEmailQuotationRequest, unknown> => {
    const queryClient = useQueryClient();
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: (sendEmailQuotationRequest: SendEmailQuotationRequest) => sendEmailQuotation(sendEmailQuotationRequest),
        onSuccess: () => {
            handleOpenNotification("La cotización fue enviada exitosamente.", 'success');

            queryClient.invalidateQueries({
                queryKey: [...QUERY_KEYS.quotations.getAllQuotation, username],
            });

            setTimeout(() => {
                closeModal();
            }, 5000);
        },
        onError: () => {
            handleOpenNotification("Error enviando la cotización.", 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        mutationKey: MUTATION_KEYS.email.sendEmailQuotation,
        retry: false
    });
};

export default useSendEmailQuotation;