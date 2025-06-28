import React from "react";
import ColorCircles from "../products/ColorCircles";
import Button from "../Button";
import Collapsible from "../collapsible/Collapsible";
import { Color } from "../../types/ProductTypes";

interface SelectColorInputsProps {
    colors: Color[];
    selectedColors: Color[];
    setSelectedColors: (colors: Color[]) => void;
    openColorSelector: boolean;
    setOpenColorSelector: (open: boolean) => void;
    quantities: Record<string, number>;
    onQuantityChange: (hexCode: string, value: number) => void;
    onDeleteColor: (hexCode: string) => void;
}

const SelectColorInputs: React.FC<SelectColorInputsProps> = ({
    colors,
    selectedColors,
    setSelectedColors,
    openColorSelector,
    setOpenColorSelector,
    quantities,
    onQuantityChange,
    onDeleteColor,
}) => {

    const trigger = (): React.ReactNode => {
        return(
            <div className="w-full text-left font-medium p-2 bg-white rounded mb-2">
                <span>Seleccionar el color del artículo</span>
                <span>{openColorSelector ? '▲' : '▼'}</span>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-500 text-sm">Color</span>
                    <ColorCircles
                        colors={colors}
                        selectedColors={selectedColors}
                        setSelectedColors={setSelectedColors}
                        setOpenColorSelector={setOpenColorSelector}
                        onQuantityChange={onQuantityChange}
                    />
                </div>
            </div>
        );
    };

    const content = (): React.ReactNode => {
        return(
            selectedColors.map((color) => (
                <div key={color.name} className="flex items-center gap-2">
                    <span className="w-20 font-medium" style={{ color: color.hexCode }}>{ color.name }:</span>
                    <input
                        type="number"
                        min={0}
                        placeholder="Cantidad"
                        value={quantities[color.name] ?? ''}
                        onChange={(e) => {
                            const value = Math.max(0, parseInt(e.target.value, 10) || 0);
                            onQuantityChange(color.name, value);
                        }}
                        className="border px-2 py-1 w-24 rounded"
                    />
                    <Button
                        type="button"
                        onClick={() => onDeleteColor(color.name)}
                        className="text-red-500 text-sm"
                    >
                        eliminar
                    </Button>
                </div>
            ))
        );
    };

  return (
    <Collapsible 
        trigger={trigger()}
        content={content()}
        isOpen={openColorSelector}
        onToggle={setOpenColorSelector}
    />
  );
}

export default SelectColorInputs;