import React from 'react'

import InventoryCard from './InventoryCard'
import Inventory from '../../types/inventory.ts'

const InventoryList: React.FC<{ inventories: Inventory[] }> = ({ inventories }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {inventories.map((inventory) => (
        <InventoryCard key={inventory.id} inventory={inventory} />
      ))}
    </div>
  )
}
