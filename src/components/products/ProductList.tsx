import React from 'react'
import ProductCard from './ProductCard'
import { ProductCard as ProductCardType } from '../../types/ProductTypes'

interface ProductListProps {
  products: ProductCardType[];
  classname?: string;
}

const ProductList: React.FC<ProductListProps> = React.memo(({ products, classname }) => {
  if (!Array.isArray(products)) {
    console.error('Expected products to be an array, but got:', products);
    return <div>No product data available</div>;
  }

  return (
    <div className={classname}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
});

ProductList.displayName = 'ProductList';

export default ProductList 