
interface QuotationInformationProps {
  totalQuantity: number;
  selectedPrintingMethod: string;
  heightCm?: number;
  widthCm?: number;
  productPrice: string;
  printingPrice?: string;
  totalPrice: string;
}

const QuotationInformation: React.FC<QuotationInformationProps> = ({
    totalQuantity,
    selectedPrintingMethod,

    heightCm,
    widthCm,
    productPrice,
    printingPrice,
    totalPrice,
}) => {
  return (
    <div className="mt-4 text-left">
        <h3 className="text-lg font-bold mb-2">Información de la cotización</h3>
        <p className="text-sm text-gray-600 mb-1">Cantidad total: <span className="font-bold">{totalQuantity} und</span></p>
        <p className="text-sm text-gray-600 mb-1">Método de marcación: <span className="font-bold">{selectedPrintingMethod || 'No seleccionado'}</span></p>
        {selectedPrintingMethod !== "" && (
          <p className="text-sm text-gray-600 mb-1">
            Tamaño personalizado: 
            <span className="font-bold">
              {heightCm ? `${heightCm} cm x ` : ''}{widthCm ? `${widthCm} cm` : ''}
            </span>
          </p>
        )}
        <p className="text-sm text-gray-600">Precio unitario - producto: <span className="font-bold">${productPrice}</span></p>
        <p className="text-sm text-gray-600">Precio unitario - Marcación: <span className="font-bold">${printingPrice}</span></p>
        <p className="text-sm text-blue-600 font-bold">Precio Total: <span className="font-bold">${totalPrice}</span></p>
    </div>
  );
};

export default QuotationInformation;