import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carousel';
import ServiceInformation from '../../components/ServiceInformation.tsx'

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <ServiceInformation />
      <Footer />
    </div>
  );
}

export default HomePage;
