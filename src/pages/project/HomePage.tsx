import React from 'react';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx';
import TitleDivider from '../../components/TitleDivider.tsx';
import FavoriteInventoryList from '../../components/homepage/FavoriteInventoryList.tsx';
import FeaturedProductsCarousel from '../../components/products/FeaturedProductsCarousel.tsx';

const HomePage: React.FC = () => {

  return (
    <div>
      <Carousel />
      <TitleDivider title="NUESTROS SERVICIOS"/>
      <ServiceInformation />
      <TitleDivider title="NUESTROS PRODUCTOS" />
      <FavoriteInventoryList />
      <TitleDivider title='PRODUCTOS DESTACADOS' />
      <FeaturedProductsCarousel />
    </div>
  );
}

export default HomePage;
