import React from 'react'

import Button from '../Button'
import { ResponseInventoriesInfo } from '../../types/inventory'
import { BUTTON_DESIGN } from '../../constants/buttonDesign'

const InventoryCard: React.FC<{ inventory: ResponseInventoriesInfo }> = ({ inventory: { title, imagePath, lists } }) => {

  return (
    <div className="bg-cover bg-center bg-no-repeat h-90 w-90 flex flex-col pl-5 justify-end" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagePath})` }}>
      <h1 className="text-left font-bold w-full text-xl uppercase mb-2">
        {title}
      </h1>
      
      <div className="w-full pb-2 pl-5">
        {
          lists.map((item, index) => (
            <ul key={index} className="list-disc text-left">
              <li className='text-gray-200 marker:text-white'>
                {item.name}
              </li>
            </ul>
          ))
        }
      </div>
      <div className="flex justify-start items-start mb-7 mt-2">
        <Button type="button" className={BUTTON_DESIGN.EXPLORER_BUTTON}>
          Explorar
        </Button>
      </div>
    </div>
  )
}

export default InventoryCard
