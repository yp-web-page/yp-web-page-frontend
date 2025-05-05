import React from 'react'

import InventoryCard from './InventoryCard'
import { ResponseInventoriesInfo } from '../../types/inventory'

const InventoryList: React.FC<{ inventories: ResponseInventoriesInfo[] }> = ({ inventories }) => {

  if (!Array.isArray(inventories)) {
    console.error('Expected inventories to be an array, but got:', inventories);
    return <div>No inventory data available</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-7 pl-1 pr-1">
      {inventories.map((inventory) => (
        <InventoryCard key={inventory.name} inventory={inventory} />
      ))}
    </div>
  )
}

export default InventoryList
