import React from 'react';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx';
import TitleDivider from '../../components/TitleDivider.tsx';
import InventoryList from '../../components/products/InventoryList.tsx';
import { useGetInventoriesInfo } from '../../hooks/useGetInventoriesInfo'


const HomePage: React.FC = () => {

  const { data, isLoading, isError, error } = useGetInventoriesInfo();
  const inventories = data

  console.log("inventories", inventories)

  return (
    <div>
      <Carousel />
      <TitleDivider title="NUESTROS SERVICIOS"/>
      <ServiceInformation />
      <TitleDivider title="NUESTROS PRODUCTOS" />
      {isLoading && <div className="text-center">Cargando...</div>}
      {isError && <div className="text-center">Error: {error.message}</div>}
      {inventories? (
        <div className='bg-white'>
        <div className='container flex mx-auto items-center justify-center bg-white'>
          <InventoryList inventories={inventories} />
        </div>
        </div>
      ) : (
        <div className="text-center">No hay productos disponibles</div>
      )}
    </div>
  );
}

export default HomePage;
