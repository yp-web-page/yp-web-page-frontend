import React from 'react'

interface PriceLabelProps {
    price: string | null
}

const PriceLabel: React.FC<PriceLabelProps> = ({ price }) => {

    return (
        <>
            <p className="text-lg font-bold text-black">
                ${price || '0.00'}
            </p>
            <div className="text-xs text-gray-500 mb-4">*Precio no incluye marcación*</div>
        </>
    )
}

export default PriceLabel;