import { useCallback, useMemo, useState } from "react";
import { Product, Color } from "../../types/ProductTypes";
import ModalWrapper from "./ModalWrapper";
import Button from "../Button";
import SelectColorInputs from "../quotation/SelectedColorInputs";
import PrintingMethodSelector from "../quotation/PrintingMethodSelector";
import CustomSizePrinting from "../quotation/CustomSizePrinting";
import QuotationInformation from "../quotation/QuotationInformation";
import SelectColorInformation from "../quotation/SelectColorInformation";

interface QuotationModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
}

const QuotationModal:React.FC<QuotationModalProps> = ({ isOpen, onClose, product}) => {
    
    if (!product) {
        return null;
    }

    console.log("product", product);
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
    const [heightCm, setHeightCm] = useState<number>(height || 0);
    const [widthCm, setWidthCm] = useState<number>(width || 0);

    const totalQuantity = useMemo(() => Object.values(quantities).reduce((acc, qty) => acc + (qty || 0), 0), [quantities]);
    const showQuotationInformation = quantities && Object.values(quantities).some(qty => qty > 0) && !openColorSelector;
    console.log("showQuotationInformation", showQuotationInformation);
    console.log("quantities", quantities);
    const totalPrice = useMemo(() => price ? (totalQuantity * parseFloat(price)).toFixed(2) : "0.00", [totalQuantity, price]);

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
            {isPrintPersonalizable && (
               <CustomSizePrinting 
                    printingArea={printingArea}
                    heightCm={heightCm}
                    setHeightCm={setHeightCm}
                    widthCm={widthCm}
                    setWidthCm={setWidthCm}
                /> 
            )}
            {showQuotationInformation && (
                <QuotationInformation
                    totalQuantity={totalQuantity}
                    selectedPrintingMethod={selectedPrintingMethod}
                    isPrintPersonalizable={isPrintPersonalizable}
                    heightCm={heightCm}
                    widthCm={widthCm}
                    price={price || "0.00"}
                    totalPrice={totalPrice}
                />
            )
            }
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <Button
                    type="button"
                    className="w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    className="w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient"
                >
                    Agregar a Cotización
                </Button>
            </div>
        </div>
    </ModalWrapper>
  );
}

export default QuotationModal;