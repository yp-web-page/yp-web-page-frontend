import React from "react";

interface ToolTipProps {
  text: string;
};

const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
  return (
    <div className="group relative ml-1 mt-1">
      <span className="text-gray-400 cursor-pointer text-xs font-bold">❓</span>
      <div className="absolute z-10 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 -translate-x-1/2 shadow-lg">
        {text}
    </div>
    </div>
  );
}
export default ToolTip;