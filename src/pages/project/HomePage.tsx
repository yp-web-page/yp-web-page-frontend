import React from 'react';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx';
import TitleDivider from '../../components/TitleDivider.tsx';

const HomePage: React.FC = () => {
  return (
    <div>
      <Carousel />
      <TitleDivider title="NUESTROS SERVICIOS"/>
      <ServiceInformation />
    </div>
  );
}

export default HomePage;
