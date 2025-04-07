import React from "react";
import Skeleton from "./ui/Skeleton";

const CarouselSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(3)].map((_, i) => (
      <Skeleton
        key={i}
        className="relative aspect-[16/9] w-full 
                   max-h-[300px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]
                   rounded-lg overflow-hidden"
      />
    ))}
  </div>
);

export default React.memo(CarouselSkeleton);