import React from 'react'

import InventoryCard from './InventoryCard'
import { ResponseInventoriesInfo } from '../../types/inventory'

interface InventoryListProps {
  inventories: ResponseInventoriesInfo[];
  classname?: string;
}

const InventoryList: React.FC<InventoryListProps> = React.memo(({ inventories, classname }) => {

  if (!Array.isArray(inventories)) {
    console.error('Expected inventories to be an array, but got:', inventories);
    return <div>No inventory data available</div>;
  }

  return (
    <div className={classname}>
      {inventories.map((inventory) => (
        <InventoryCard key={inventory.id} inventory={inventory} />
      ))}
    </div>
  )
});

export default InventoryList
