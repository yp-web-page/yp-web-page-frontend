import React from "react";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
  return (
    <div className="flex-1 bg-white rounded-xl shadow-lg p-6 text-center">
      <h2 className="text-gray-600 mb-6 text-base sm:text-lg font-bold">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default InfoCard;