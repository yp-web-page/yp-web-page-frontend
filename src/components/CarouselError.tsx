import React from 'react';

interface CarouselErrorProps {
    message: string;
}

const CarouselError: React.FC<CarouselErrorProps> = ({message}: {message: string}) => (
    <div className="w-full h-64 flex items-center justify-center">
        <p className="text-red-500">Error loading images: {message}</p>
    </div>
);

export default React.memo(CarouselError);