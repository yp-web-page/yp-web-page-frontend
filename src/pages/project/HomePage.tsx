import React from 'react';
import Hero from '../../components/homepage/Hero';
import Services from '../../components/homepage/Services';
import Process from '../../components/homepage/Process';
import FeaturedProductsCarousel from '../../components/products/FeaturedProductsCarousel';

const HomePage: React.FC = () => (
    <>
        <Hero />
        <FeaturedProductsCarousel />
        <Process />
        <Services />
    </>
);

export default HomePage;
