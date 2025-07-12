import React, { useCallback } from 'react'

import { Color } from '../../types/ProductTypes'
import Button from '../Button';
import clsx from 'clsx';

interface ColorCirclesProps {
    colors: Color[] | null;
    selectedColors?: Color[];
    setSelectedColors?: (colors: Color[]) => void;
    setOpenColorSelector?: (open: boolean) => void;
    onQuantityChange?: (hexCode: string, value: number) => void;
}

const ColorCircles: React.FC<ColorCirclesProps> = ({ 
    colors, 
    selectedColors, 
    setSelectedColors, 
    setOpenColorSelector,
    onQuantityChange,
}) => {

    const isInteractive = setSelectedColors && setOpenColorSelector && onQuantityChange && selectedColors;

    const handleColorClick = useCallback((event: React.MouseEvent, color: Color) => {
        event.stopPropagation();
        if (!isInteractive) return;

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
    }, [selectedColors, setSelectedColors, setOpenColorSelector, onQuantityChange, isInteractive]);

    return (
        <div className="flex items-center gap-2">
            {colors?.map((color) => {
                const isSelected = selectedColors?.some(c => c.hexCode === color.hexCode);
                return (
                    <Button
                        type="button"
                        key={color.hexCode}
                        className={clsx(
                            "w-5 h-5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1",
                            {
                                "ring-2 ring-blue-500": isSelected,
                            }
                        )}
                        style={{ backgroundColor: color.hexCode }}
                        onClick={(event) => handleColorClick(event, color)}
                        aria-label={`Seleccionar color ${color.name}`}
                    />
                );
            })}
      </div>
    )
}

export default ColorCircles;