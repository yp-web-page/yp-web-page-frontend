// hooks/useGenerateQuotationPdf.ts
import { useMutation } from "@tanstack/react-query";
import { quotationService } from "../services/quotationService";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";
import { MUTATION_KEYS } from "../api/mutationKeys";

const useGenerateQuotationPdf = () => {
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
            openModal("notification", message,    typeNotification);
    };

  return useMutation({
    mutationFn: quotationService.generatePdfQuotation,
    onSuccess: (blob) => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cotizacion.pdf");
      document.body.appendChild(link);

      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
        handleOpenNotification("Error descargando el pdf de cotización.", 'error');

        setTimeout(() => {
                closeModal();
        }, 5000);
    },
    mutationKey: MUTATION_KEYS.quotation.generatePdfQuotation,
    retry: false
  });
};

export default useGenerateQuotationPdf;