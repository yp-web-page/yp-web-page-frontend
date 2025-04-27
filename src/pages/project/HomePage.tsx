import React from 'react';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx';

const HomePage: React.FC = () => {
  return (
    <div>
      <Carousel />
      <ServiceInformation />
    </div>
  );
}

export default HomePage;
