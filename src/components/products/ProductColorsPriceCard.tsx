import React from 'react';

import ColorCircles from './ColorCircles';

import { Color } from '../../types/ProductTypes';

interface ProductColorsPriceCardProps {
  colors: Color[];
  // Kept for API compatibility with callers; price is intentionally not shown
  // while pricing + quotation are disabled (served later from the ERP).
  price?: string | null;
}

const ProductColorsPriceCard: React.FC<ProductColorsPriceCardProps> = ({ colors }) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      <ColorCircles colors={colors} />
    </div>
  );
};

export default ProductColorsPriceCard;
