import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* A simple spinner (using Tailwind for styling) */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner; 