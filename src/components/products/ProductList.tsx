import React from 'react'
import ProductCard from './ProductCard'
import ProductColorsPriceCard from './ProductColorsPriceCard'
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

  console.log(products)

  return (
    <div className={classname}>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard key={product.id} product={{id: product.id, name: product.name, imageUrl: product.imageUrl }} />
          <ProductColorsPriceCard colors={product.colors} price={product.price} />
        </div>
      ))}
    </div>
  )
});

ProductList.displayName = 'ProductList';

export default ProductList 