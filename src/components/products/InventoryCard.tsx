import React from 'react'

import Inventory from '../../types/inventory.ts'

const InventoryCard: React.FC<{ inventory: Inventory }> = ({ inventory: { itemsList, imagePath, title, nextPath } }) => {

  return (
    <div className="bg-cover bg-center bg-no-repeat h-full w-full" style={{ backgroundImage: `url(${imagePath})` }}>
      <h1>
        title
      </h1>
      {
        itemsList.map((item, index) => (
          <ul key={index} className="list-disc">
            <li>{item}</li>
          </ul>
        ))
      }
      <button>

      </button>
    </div>
  )
}

export default InventoryCard
