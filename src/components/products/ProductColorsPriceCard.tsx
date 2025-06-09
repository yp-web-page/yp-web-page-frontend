import React from 'react';

import { Color } from '../../types/ProductTypes';

interface ProductColorsPriceCardProps {
  colors: Color[];
  price: string | null;
}

const ProductColorsPriceCard: React.FC<ProductColorsPriceCardProps> = ({ colors, price }) => {

    console.log(colors)
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-5 h-5 rounded-full border border-gray-200"
            style={{ backgroundColor: color.hexCode }}
          />
        ))}
      </div>
      <p className="text-lg font-bold text-black">
        ${price || '0.00'}
      </p>
      <div className="text-xs text-gray-500 mb-4">*Precio no incluye marcación*</div>
    </div>
  );
};

export default ProductColorsPriceCard;
