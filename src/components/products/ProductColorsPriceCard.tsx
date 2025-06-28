import React from 'react';

import ColorCircles from './ColorCircles';
import PriceLabel from './PriceLabel';
import { useAuth } from '../../context/AuthContext';

import { Color } from '../../types/ProductTypes';

interface ProductColorsPriceCardProps {
  colors: Color[];
  price: string | null;
}

const ProductColorsPriceCard: React.FC<ProductColorsPriceCardProps> = ({ colors, price }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-2 py-2">
      <ColorCircles colors={colors} />
      {isAuthenticated && <PriceLabel price={price} />}
    </div>
  );
};

export default ProductColorsPriceCard;
