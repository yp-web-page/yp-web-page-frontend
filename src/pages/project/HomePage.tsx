import React from 'react';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx';
import TitleDivider from '../../components/TitleDivider.tsx';
import FavoriteInventoryList from '../../components/homepage/FavoriteInventoryList.tsx';

const HomePage: React.FC = () => {

  return (
    <div>
      <Carousel />
      <TitleDivider title="NUESTROS SERVICIOS"/>
      <ServiceInformation />
      <TitleDivider title="NUESTROS PRODUCTOS" />
      <FavoriteInventoryList />
    </div>
  );
}

export default HomePage;
