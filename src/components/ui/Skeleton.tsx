import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-300 dark:bg-gray-700 rounded",
        className
      )}
    />
  );
};

export default Skeleton;