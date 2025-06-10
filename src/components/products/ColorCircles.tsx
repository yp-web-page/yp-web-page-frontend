import React from 'react'

import { Color } from '../../types/ProductTypes'

interface ColorCirclesProps {
    colors: Color[]
}

const ColorCircles: React.FC<ColorCirclesProps> = ({ colors }) => {

    return (
        <div className="flex items-center gap-2">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.hexCode }}
                />
            ))}
      </div>
    )
}

export default ColorCircles;