import { useMutation } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { GetPricesRequest } from "../types/ProductTypes";
import { MUTATION_KEYS } from "../api/mutationKeys";
import { useModal } from "../context/ModalContext";
import { TypeNotification } from "../types/TypeNotifcation";

const getProductPrices = productService.getProductPrices;

const useGetProductPrices = () => {

    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    return useMutation({
        mutationFn: (getPricesRequest: GetPricesRequest) => getProductPrices(getPricesRequest),
        onError: () => {
            handleOpenNotification("Error obteniendo los precios para los products.", 'error');
            setTimeout(() => {
                closeModal();
            }
            , 5000);
        },
        mutationKey: MUTATION_KEYS.product.getProductPrices,
        retry: false,
    })
};

export default useGetProductPrices;