import React from "react"

import { TitledDividerProps } from "../types/HomePageTypes"

const TitleDivider: React.FC<TitledDividerProps> = ({ title, className = "" }) => {
    return (
        <div className={`w-full flex items-center py-4 bg-white ${className}`}>
          <div className="flex-grow h-px bg-gray-300"></div>
          {title && (
            <span className="px-4 text-gray-600 font-medium text-sm md:text-2xl">
              {title}
            </span>
          )}
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
      )
}

export default TitleDivider