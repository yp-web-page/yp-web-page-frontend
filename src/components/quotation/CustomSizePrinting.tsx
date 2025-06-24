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
    const handleDimesionChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setValue: (value: number) => void
    ) => {
        const raw: number = parseInt(event.target.value, 10);
        const value: number = isNaN(raw) ? 1 : Math.max(1, raw);
        setValue(value); 
    };

    const renderInput = (
        label: string,
        value: number,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    ) => {
        return (
            <div className="text-center">
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input
                    type="number"
                    min={1}
                    placeholder="CM"
                    className="border px-2 py-1 w-20 rounded text-center"
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    };

    return(
        <div className="mt-4 justify-center">
            <p className="text-sm text-red-500">Medida sugeridad: <span>{printingArea}</span></p>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño (en cm)</label>
            <div className="flex justify-center text-center gap-4">
                {renderInput("Alto", heightCm, (e) => handleDimesionChange(e, setHeightCm))}
                <span className="text-lg font-bold">x</span>
                {renderInput("Ancho", widthCm, (e) => handleDimesionChange(e, setWidthCm))}
            </div>
        </div>
    );
};

export default CustomSizePrinting;