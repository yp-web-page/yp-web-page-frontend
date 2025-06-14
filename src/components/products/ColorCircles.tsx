import React from 'react'

import { Color } from '../../types/ProductTypes'

interface ColorCirclesProps {
    colors: Color[] | null;
    selectedColors?: Color[];
    setSelectedColors?: (colors: Color[]) => void;
    setOpenColorSelector?: (open: boolean) => void;
    onQuantityChange: (hexCode: string, value: number) => void;
}

const ColorCircles: React.FC<ColorCirclesProps> = ({ 
    colors, 
    selectedColors, 
    setSelectedColors, 
    setOpenColorSelector,
    onQuantityChange,
}) => {
    const handleColorClick = (event: React.MouseEvent, color: Color) => {
        event.stopPropagation();
        if (!setSelectedColors || !selectedColors || !setOpenColorSelector || !onQuantityChange) return;

        const isAlreadySelected = selectedColors.some(c => c.name === color.name);

        if (isAlreadySelected) {
            setSelectedColors(selectedColors.filter(c => c.name !== color.name));
            onQuantityChange(color.name, 0); // Reset quantity for removed color

             if (selectedColors.length === 1) {
                setOpenColorSelector(false); // Close selector if no colors left
             }  
        } else {
            setSelectedColors([...selectedColors, color]);
            setOpenColorSelector(true); // Keep selector open
        }
    };

    return (
        <div className="flex items-center gap-2">
            {colors?.map((color) => {
                const isSelected = selectedColors?.some(c => c.hexCode === color.hexCode);
                return (
                    <button
                        type="button"
                        key={color.hexCode}
                        className={`w-5 h-5 rounded-full border border-gray-200 focus:outline-none ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                        style={{ backgroundColor: color.hexCode }}
                        onClick={(event) => handleColorClick(event, color)}
                    />
                );
            })}
      </div>
    )
}

export default ColorCircles;