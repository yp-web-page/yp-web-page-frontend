import React from "react";
import { FeaturedProductCard as ProductCardType } from "../../types/ProductTypes";

interface ProductCardProps {
  product: ProductCardType;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  return (
    <div className="flex flex-col justify-between bg-white h-50 w-35 lg:h-80 lg:w-65 md:h-70 md:w-55 sm:h-60 sm:w-45  rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-shadow duration-300 overflow-hidden">
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xs md:text-sm lg:text-md uppercase text-gray-800 truncate text-center">
          {product.name}
        </h3>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

