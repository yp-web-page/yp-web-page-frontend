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
    const username: string | null = UserUtils.getUsernameFromLocalStorage();
    const { openModal, closeModal } = useModal();
    const handleOpenNotification = (message: string, typeNotification: TypeNotification) => {
        openModal("notification", message,    typeNotification);
    };

    useEffect(() => {
        if (isOpen && username == null) {
            handleOpenNotification("El usuario no se encuentra logeado, por lo tanto no puede cotizar.", 'error');
            setTimeout(closeModal, 5000);
        }
    }, [isOpen, username]);

    if (!isOpen || !product || !username) {
        return null;
    }

    const { colors, name: productName, isPrintPersonalizable, printingMethods, price: productPrice, printingArea } = product;
    const [openColorSelector, setOpenColorSelector] = useState(true);
    const [quantities, setQuantities] = useState<Record<string, number>>({});    
    const [selectedColors, setSelectedColors] = useState<Color[]>([]);
    const [selectedPrintingMethod, setSelectedPrintingMethod] = useState<string>("");
    const { height, width } = useMemo(() => QuotationUtils.parsePrintingArea(product?.printingArea), [product?.printingArea]);
    const [heightCm, setHeightCm] = useState<number>(height);
    const [widthCm, setWidthCm] = useState<number>(width);

    const { mutate, data: printingPricesResponse, isPending: isPendingPrices, isError } = useGetProductPrices();
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

    const totalQuantity = useMemo(() => QuotationUtils.getTotalQuantity(quantities), [quantities]);
    const showQuotationInformation = useMemo(() => quantities && Object.values(quantities).some(qty => qty > 0) && !openColorSelector, [quantities, openColorSelector]);

    const printingPrice = useMemo(() => {
        if (isPendingPrices || !printingPricesResponse?.priceDtos?.length) return 0;
        const printingPrices: PrintingProductPrice[] = printingPricesResponse.priceDtos;
        return QuotationUtils.getPrintingPrice({
            printingPrices,
            selectedPrintingMethod,
            isPending: isPendingPrices,
            totalQuantity,
            product,
            printingMethods
        });
    }, [printingPricesResponse?.priceDtos, selectedPrintingMethod, isPendingPrices, totalQuantity, product.id, printingMethods]);
    
    const calculateTotalPrice = useMemo(() => {
        return QuotationUtils.calculateTotalPrice({
            productPrice: parseFloat(productPrice),
            totalQuantity,
            heightCm,
            widthCm,
            printingPrice,
            isPrintPersonalizable
        });
    }, [productPrice, totalQuantity, heightCm, widthCm, printingPrice, isPrintPersonalizable]);

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

    const handleCancelQuotation = useCallback(() => {
        setSelectedColors([]);
        setQuantities({});
        setSelectedPrintingMethod("");
        setHeightCm(0);
        setWidthCm(0);
        setOpenColorSelector(true);
        onClose();
    }, [onClose]);

    const handleAddQuotation = useCallback(() => {
        const addProductToQuotations: AddProductToQuotation[] =  selectedColors.map((color: Color) => ({
            id: null,
            username,
            productName,
            productPrice: parseFloat(productPrice),
            colorName: color.name,
            printName: selectedPrintingMethod,
            printPrice: printingPrice,
            quantity: quantities[color.name],
            width: !printingArea || selectedPrintingMethod !== "" ? widthCm : 0,
            height: !printingArea || selectedPrintingMethod !== "" ? heightCm : 0,
            subtotal: 0,
            isPrintPersonalizable,
        }));
        addProductToQuotation({addProductToQuotations});
    }, [
        productName, 
        productPrice, 
        selectedColors, 
        quantities, 
        selectedPrintingMethod, 
        printingPrice, 
        widthCm, 
        heightCm, 
        isPrintPersonalizable, 
        printingArea, 
        addProductToQuotation
    ]);

    const disabledAddToQuotation = isPendingPrices|| totalQuantity <= 0 || isError;

    return (
        <ModalWrapper 
            isOpen={isOpen} 
            onClose={onClose}
            showIcon={false}
            childrenWrapperClassName="w-full max-w-[95%] sm:max-w-md mx-auto rounded-xl sm:rounded-2xl bg-white shadow-xl overflow-hidden relative pt-5 sm:pt-8"
        >
            <div className="p-4 space-y-0 w-full max-w-3xl mx-auto text-center text-lg text-gray-800">
                <div className="flex-column text-lg mb-4">
                    <span>Agregar: <h2 className="font-bold">{productName}</h2></span>
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
                <QuotationInformation
                    totalQuantity={totalQuantity}
                    selectedPrintingMethod={selectedPrintingMethod}
                    heightCm={heightCm}
                    widthCm={widthCm}
                    productPrice={productPrice}
                    printingPrice={printingPrice.toFixed(2)}
                    totalPrice={calculateTotalPrice}
                    isPrintPersonalizable={isPrintPersonalizable}
                />
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