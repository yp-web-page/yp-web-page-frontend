import React from 'react';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx'

const HomePage: React.FC = () => {
  return (
    <div className='font-bahamas-bold'>
      <Carousel />
      <ServiceInformation />
    </div>
  );
}

export default HomePage;
