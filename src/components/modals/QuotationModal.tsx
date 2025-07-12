import { useCallback, useEffect, useMemo, useState } from "react";
import { Product, Color, PrintingProductPrice } from "../../types/ProductTypes";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import SelectColorInputs from "../quotation/SelectedColorInputs";
import PrintingMethodSelector from "../quotation/PrintingMethodSelector";
import CustomSizePrinting from "../quotation/CustomSizePrinting";
import QuotationInformation from "../quotation/QuotationInformation";
import SelectColorInformation from "../quotation/SelectColorInformation";
import useGetProductPrices from "../../hooks/useGetProductPrices";
import { QuotationUtils } from "../../util/quotationUtils";
import { AddProductToQuotation } from '../../types/Quotation';
import useAddProductToQuotation from "../../hooks/useAddProductToQuotation";
import { useModal } from "../../context/ModalContext";
import { TypeNotification } from "../../types/TypeNotifcation";
import { UserUtils } from "../../util/userUtils";

interface QuotationModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
}

const QuotationModal:React.FC<QuotationModalProps> = ({ isOpen, onClose, product}) => {
    if (!product) {
        return null;
    }

    const { colors, name, isPrintPersonalizable, printingMethods, price, printingArea } = product;

    const { height, width } = useMemo(() => {
        if (!printingArea) return { height: 0, width: 0 };
        const match = product.printingArea.match(/(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)/);
        return {
            height: match ? parseFloat(match[1]) : 0,
            width: match ? parseFloat(match[2]) : 0,
        };
    }, [printingArea, product]);

    const [openColorSelector, setOpenColorSelector] = useState(true);
    const [quantities, setQuantities] = useState<Record<string, number>>({});    
    const [selectedColors, setSelectedColors] = useState<Color[]>([]);
    const [selectedPrintingMethod, setSelectedPrintingMethod] = useState<string>("");
    const [heightCm, setHeightCm] = useState<number>(height);
    const [widthCm, setWidthCm] = useState<number>(width);

    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    const username: string | null = UserUtils.getUsernameFromLocalStorage();

    if (username == null) {
        handleOpenNotification("El usuario no se encuentra logeado, por lo tanto no puede cotizar.", 'error');
        setTimeout(() => {
            closeModal();
        }, 5000);
         return null;
    }

    const { mutate, data: printingPricesResponse, isPending, isError } = useGetProductPrices();
    const { mutate: addProductToQuotation } = useAddProductToQuotation({ onCloseQuotationModal: onClose, username });

    useEffect(() => {
        if (!isOpen || !product) return;
        const printIds = printingMethods?.map(pm => pm.id) || [];
        mutate({ productId: product.id, printIds });
    }, [isOpen, product]);

    useEffect(() => {
        if (isOpen) {
            setHeightCm(height);
            setWidthCm(width);
        }
    }, [isOpen, height, width]);

    const totalQuantity = useMemo(() => {
        return QuotationUtils.getTotalQuantity(quantities);
    }, [quantities]);
    
    const showQuotationInformation = quantities && Object.values(quantities).some(qty => qty > 0) && !openColorSelector;
    const disabledAddToQuotation = isPending|| totalQuantity <= 0 || isError;

    const printingPrice = useMemo(() => {
        if (isPending || !printingPricesResponse?.priceDtos || printingPricesResponse.priceDtos.length === 0) {
            return 0.00;
        }

        const printingPrices: PrintingProductPrice[] = printingPricesResponse.priceDtos;
        return QuotationUtils.getPrintingPrice({
            printingPrices,
            selectedPrintingMethod,
            isPending,
            totalQuantity,
            product,
            printingMethods
        });
    }, [printingPricesResponse?.priceDtos, selectedPrintingMethod, isPending, totalQuantity, product.id, printingMethods]);
    
    const calculateTotalPrice = useMemo(() => {
        return QuotationUtils.calculateTotalPrice({
            productPrice: parseFloat(price),
            totalQuantity,
            heightCm,
            widthCm,
            printingPrice,
            isPrintPersonalizable
        });
    }, [price, totalQuantity, heightCm, widthCm, printingPrice, isPrintPersonalizable]);

    const handleQuantityChange = useCallback((name: string, value: number) => {
        setQuantities(prev => ({
            ...prev,
            [name]: isNaN(value) ? 0 : value,
        }));
    }, []);

    const handleDeleteColor = useCallback((name: string) => {
        setSelectedColors(prev => prev.filter(c => c.name !== name));
        setQuantities(prev => {
            const newQuantities = { ...prev };
            delete newQuantities[name];
            return newQuantities;
        });
    }, []);

    const handleCancelQuotation = () => {
        setSelectedColors([]);
        setQuantities({});
        setSelectedPrintingMethod("");
        setHeightCm(0);
        setWidthCm(0);
        setOpenColorSelector(true);
        onClose();
    };

    const handleAddQuotation = () => {
        const addProductToQuotations: AddProductToQuotation[] = []; 
        selectedColors.map((color: Color) => {
            const quantity: number = quantities[color.name];
            const username: string = localStorage.getItem("user") || "";

            const addProductToQuotation: AddProductToQuotation = {
                id: null,
                username: username,
                productName: name,
                productPrice: parseFloat(price),
                colorName: color.name,
                printName: selectedPrintingMethod,
                printPrice: printingPrice,
                quantity: quantity,
                width: !printingArea || selectedPrintingMethod !== "" ? widthCm : 0,
                height: !printingArea || selectedPrintingMethod !== "" ? heightCm : 0,
                subtotal: 0.0,
                isPrintPersonalizable: isPrintPersonalizable
            };

            addProductToQuotations.push(addProductToQuotation);
        });

        addProductToQuotation({addProductToQuotations});
    };

  return (
    <ModalWrapper 
        isOpen={isOpen} 
        onClose={onClose}
        showIcon={false}
        childrenWrapperClassName="w-full max-w-[95%] sm:max-w-md mx-auto rounded-xl sm:rounded-2xl bg-white shadow-xl overflow-hidden relative pt-5 sm:pt-8"
    >
        <div className="p-4 space-y-0 w-full max-w-3xl mx-auto text-center text-lg text-gray-800">
            <div className="flex-column text-lg mb-4">
                <span>Agregar: <h2 className="font-bold">{name}</h2></span>
            </div>
            <div className="border rounded-lg p-2 mb-4 bg-white shadow-sm">
                <SelectColorInputs 
                    colors={colors}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    openColorSelector={openColorSelector}
                    setOpenColorSelector={setOpenColorSelector}
                    quantities={quantities}
                    onQuantityChange={handleQuantityChange}
                    onDeleteColor={handleDeleteColor}
                />
            </div>
            {showQuotationInformation && (
                <SelectColorInformation
                    quantities={quantities}
                />
            )}
            {printingMethods && printingMethods.length > 0 && (
                <PrintingMethodSelector
                    selectedPrintingMethod={selectedPrintingMethod}
                    setSelectedPrintingMethod={setSelectedPrintingMethod}
                    printingMethods={printingMethods}
                />
            )}
            {selectedPrintingMethod && (
               <CustomSizePrinting 
                    printingArea={printingArea}
                    heightCm={heightCm}
                    setHeightCm={setHeightCm}
                    widthCm={widthCm}
                    setWidthCm={setWidthCm}
                    isPrintPersonalizable={isPrintPersonalizable}
                /> 
            )}
            {showQuotationInformation && (
                <QuotationInformation
                    totalQuantity={totalQuantity}
                    selectedPrintingMethod={selectedPrintingMethod}
                    heightCm={heightCm}
                    widthCm={widthCm}
                    productPrice={price}
                    printingPrice={printingPrice.toFixed(2)}
                    totalPrice={calculateTotalPrice}
                />
            )}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <Button
                    type="button"
                    className="w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                    onClick={handleCancelQuotation}
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    className={disabledAddToQuotation ? 
                        "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 bg-gray-500 text-white": 
                        "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient"}
                    disabled={disabledAddToQuotation}
                    onClick={handleAddQuotation}
                >
                    Agregar a Cotización
                </Button>
            </div>
        </div>
    </ModalWrapper>
  );
}

export default QuotationModal;