import React from "react";
import { PrintingMethod } from "../../types/ProductTypes";

interface PrintingMethodSelectorProps {
    selectedPrintingMethod: string;
    setSelectedPrintingMethod: (method: string) => void;
    printingMethods: PrintingMethod[];
}

const PrintingMethodSelector: React.FC<PrintingMethodSelectorProps> = ({ 
    selectedPrintingMethod,
    setSelectedPrintingMethod,
    printingMethods,
}) => {
    return(
        <div className="mt-4 text-left">
            <select
                id="printing-method"
                value={selectedPrintingMethod}
                onChange={(e) => setSelectedPrintingMethod(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Selecciona un tipo de marcacion</option>
                {printingMethods.map((method) => (
                    <option key={method.id} value={method.name}>
                        {method.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PrintingMethodSelector;