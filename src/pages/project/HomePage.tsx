import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carousel';

const HomePage: React.FC = () => {
  return (
    <div className='font-bahamas-bold'>
      <Header />
      <Carousel />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-title-light">Welcome to Yanca Publicity</h1>
        <p className="mt-4 text-lg text-text-light">Your one-stop solution for all your publicity needs.</p>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;