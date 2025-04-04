import React from 'react';

import Header from '../../components/Header';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Yanca Publicity</h1>
        <p className="mt-4 text-lg text-gray-600">Your one-stop solution for all your publicity needs.</p>
      </main>
    </>
  );
}

export default HomePage;