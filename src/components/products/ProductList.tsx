import React from 'react'
import ProductCard from './ProductCard'
import ProductColorsPriceCard from './ProductColorsPriceCard'
import { PaginatedProducts } from '../../types/ListType'
import Button from '../Button'

interface ProductListProps {
  products: PaginatedProducts;
  classname?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

const ProductList: React.FC<ProductListProps> = React.memo(({ 
  products, 
  classname,
  onPageChange,
  onPageSizeChange 
}) => {
  if (!products) {
    return <div>No product data available</div>;
  }

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(parseInt(event.target.value));
    }
  };

  return (
    <div>
      <div className={classname}>
        {products.content.map((product) => (
          <div key={product.id}>
            <ProductCard key={product.id} product={{id: product.id, name: product.name, imageUrl: product.imageUrl }} />
            <ProductColorsPriceCard colors={product.colors} price={product.price} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Mostrando {products.numberOfElements} de {products.totalElements} productos
          </span>
          <select
            value={products.pageable.pageSize}
            onChange={handlePageSizeChange}
            className="border rounded px-2 py-1 text-sm blue-deep-gradient rounded-full"
          >
            <option className='text-black' value="5">5 por página</option>
            <option className='text-black' value="10">10 por página</option>
            <option className='text-black' value="20">20 por página</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => handlePageChange(products.pageable.pageNumber - 1)}
            disabled={products.first}
            className="px-3 py-1 border rounded disabled:opacity-50 blue-deep-gradient rounded-full"
          >
            Anterior
          </Button>
          <span className="text-sm text-black">
            Página {products.pageable.pageNumber + 1} de {products.totalPages}
          </span>
          <Button
            type="button"
            onClick={() => handlePageChange(products.pageable.pageNumber + 1)}
            disabled={products.last}
            className="px-3 py-1 border rounded disabled:opacity-50 blue-deep-gradient rounded-full"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
});

ProductList.displayName = 'ProductList';

export default ProductList 