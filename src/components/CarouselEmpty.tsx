import React from "react";
import { SVG_PATHS } from "../constants/svgPaths";

const CarouselEmpty: React.FC = () => (
    <div className="w-screen flex flex-col items-center justify-center 
                          bg-gray-800 text-white
                           aspect-[16/9] 
                          max-h-[300px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]">
            <svg
              className="h-10 w-10 text-white mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={SVG_PATHS.NO_IMAGES_CAROUSEL}
              />
            </svg>
            <p className="text-white text-center">No hay imagenes disponibles para el carousel</p>
          </div>
);

export default React.memo(CarouselEmpty);