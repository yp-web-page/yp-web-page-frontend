import React from 'react'

import InventoryCard from './InventoryCard'
import { ResponseInventoriesInfo } from '../../types/inventory'

interface InventoryListProps {
  inventories: ResponseInventoriesInfo[];
  classname?: string;
  isFixedSize?: boolean;
}

const InventoryList: React.FC<InventoryListProps> = React.memo(({ inventories, classname, isFixedSize = false }) => {

  if (!Array.isArray(inventories)) {
    console.error('Expected inventories to be an array, but got:', inventories);
    return <div>No inventory data available</div>;
  }

  return (
    <div className={classname}>
      {inventories.map((inventory) => (
        <InventoryCard key={inventory.id} inventory={inventory} isFixedSize={isFixedSize} />
      ))}
    </div>
  )
});

export default InventoryList
