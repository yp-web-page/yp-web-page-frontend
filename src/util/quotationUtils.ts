import { PrintingMethod, PrintingProductPrice, Product } from "../types/ProductTypes";

const getTotalQuantity = (quantities: Record<string, number>): number => {
    return Object.values(quantities).reduce((acc, qty) => acc + (qty || 0), 0);
};

const getPrintingPrice = ({
    printingPrices,
    selectedPrintingMethod,
    isPending,
    totalQuantity,
    product,
    printingMethods,
}: {
    printingPrices: PrintingProductPrice[];
    selectedPrintingMethod: string;
    isPending: boolean;
    totalQuantity: number;
    product: Product;
    printingMethods: PrintingMethod[];
}): number => {
    if (
        !printingPrices || 
        printingPrices.length == 0 ||
        !selectedPrintingMethod || 
        isPending ||
        !printingMethods ||
        printingMethods.length === 0 ||
        totalQuantity <= 0
    ) return 0.00;

    const selectedMethod = printingMethods.find(method => method.name === selectedPrintingMethod);
    if (!selectedMethod) return 0.00;

    const matchedPrintingPrice = printingPrices.find(printingPrice =>
        printingPrice.printId === selectedMethod.id &&
        printingPrice.productId === product.id &&
        totalQuantity >= printingPrice.minQuantity &&
        totalQuantity <= printingPrice.maxQuantity);
    
    return matchedPrintingPrice ? matchedPrintingPrice.price : 0.00;
};

const calculateTotalPrice = ({
  productPrice,
  totalQuantity,
  heightCm,
  widthCm,
  printingPrice,
  isPrintPersonalizable,
}: {
  productPrice: number;
  totalQuantity: number;
  heightCm: number;
  widthCm: number;
  printingPrice: number;
  isPrintPersonalizable: boolean;
}): string => {
  if (!productPrice || !totalQuantity) return "0.00";

    const unitPrintPrice = printingPrice;

    const totalPrice = isPrintPersonalizable ? 
        ((((heightCm * widthCm) * unitPrintPrice) + productPrice) * totalQuantity) : 
        ((productPrice + unitPrintPrice) * totalQuantity);
    
    return totalPrice.toFixed(2);
};

const parsePrintingArea = (area?: string) => {
    if (!area) return { height: 0, width: 0 };
    // Accept "8x0.7", "8 x 0,7 cm.", "20 × 15", "20*15", etc.
    const match = area.match(/(\d+(?:[.,]\d+)?)\s*[x×X*]\s*(\d+(?:[.,]\d+)?)/);
    if (!match) return { height: 0, width: 0 };
    const toNum = (s: string) => parseFloat(s.replace(',', '.'));
    return { height: toNum(match[1]), width: toNum(match[2]) };
}

const calculateUnitPrice = (
    productPrice: number, 
    printingPrice: number, 
    isPrintPersonalizable: boolean, 
    heightCm: number, 
    widthCm: number,
    selectedPrintingMethod: string
): number => {
    if (selectedPrintingMethod === "") return productPrice;
    
    if (isPrintPersonalizable) return (heightCm * widthCm * printingPrice) + productPrice;

    return productPrice + printingPrice;
}

export const QuotationUtils = {
    calculateTotalPrice,
    getPrintingPrice,
    getTotalQuantity,
    parsePrintingArea,
    calculateUnitPrice,
};