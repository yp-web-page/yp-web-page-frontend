import React from "react";

interface CustomSizePrintingProps {
    printingArea: string;
    heightCm: number;
    setHeightCm: (value: number) => void;
    widthCm: number;
    setWidthCm: (value: number) => void;
} 

const CustomSizePrinting: React.FC<CustomSizePrintingProps> = ({
    printingArea,
    heightCm,
    setHeightCm,
    widthCm,
    setWidthCm,
}) => {
    return(
        <div className="mt-4 justify-center">
            <p className="text-sm text-red-500">Medida sugeridad: <span>{printingArea}</span></p>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño (en cm)</label>
            <div className="flex justify-center gap-4">
                <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Alto</label>
                    <input
                        type="number"
                        placeholder="CM"
                        className="border px-2 py-1 w-20 rounded text-center"
                        value={heightCm}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setHeightCm(isNaN(val) ? 0 : val);
                        }}
                    />
                </div>
                <span className="text-lg font-bold">x</span>
                <div className="text-center">
                    <label className="block text-xs text-gray-500 mb-1">Ancho</label>
                    <input
                        type="number"
                        placeholder="CM"
                        className="border px-2 py-1 w-20 rounded text-center"
                        value={widthCm}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setWidthCm(isNaN(val) ? 0 : val);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomSizePrinting;