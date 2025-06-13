import React from "react";

interface SelectColorInformationProps {
  quantities: Record<string, number>;
}

const SelectColorInformation: React.FC<SelectColorInformationProps> = ({quantities}) => {
  return (
    <ul className="mt-4">
        {Object.entries(quantities).map(([color, quantity]) => (
            quantity <= 0 ? null :
            <li key={color} className="text-xs">
                <div className="flex space-x-1 items-center">
                    <span>*</span>
                    <span>{color}:</span>
                    <span className="font-bold">{quantity} und</span>
                </div>
            </li>
        ))}
    </ul>
  );
};

export default SelectColorInformation;