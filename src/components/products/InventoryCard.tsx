import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import Button from '../Button'
import { ResponseInventoriesInfo } from '../../types/inventory'
import { BUTTON_DESIGN } from '../../constants/buttonDesign'

interface InventoryCardProps {
  inventory: ResponseInventoriesInfo
  isFixedSize?: boolean
}

const InventoryCard: React.FC<InventoryCardProps> = React.memo(({ inventory: { id, title, imagePath, lists }, isFixedSize = false }) => {

  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate(`/inventory/${id}`)
  };

  const cardClasses = isFixedSize 
    ? "bg-cover bg-center bg-no-repeat h-80 w-80 flex flex-col pl-5 justify-end"
    : "bg-cover bg-center bg-no-repeat h-40 xl:h-90 xl:w-90 lg:h-80 lg:w-80 md:w-60 md:h-60 sm:w-50 sm:h-50 flex flex-col pl-2 md:pl-5 justify-end";

  return (
    <div className={cardClasses} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagePath})` }}>
      <h1 className={`text-left font-bold w-full uppercase mb-2 ${isFixedSize ? 'text-xl' : 'text-xxs sm:text-xs xl:text-xl lg:text-base md:text-sm'}`}>
        {title}
      </h1>
      
      <div className="w-full pb-3 pl-3.5 sm:pl-5">
        {
          lists.map((item) => (
            <ul key={item.id} className={`list-disc text-left ${isFixedSize ? '-my-1' : '-my-2.5 sm:-my-2.5 lg:-my-1 md:-my-2'}`}>
              <li className={`text-gray-200 marker:text-white ${isFixedSize ? 'marker:text-base' : 'marker:text-xxs md:marker:text-xs lg:marker:text-sm xl:marker:text-base'}`}>
                <Link 
                  to={`/inventory/${id}`} 
                  state={{ listId: item.id }} 
                  className={`inline-block text-gray-200 hover:text-white ${isFixedSize ? 'text-base' : 'text-xxs md:text-xs lg:text-sm xl:text-base'}`}
                  style={{ lineHeight: '0.9' }}
                >
                  {item.name}
                </Link>
              </li>
            </ul>
          ))
        }
      </div>
      
      <div className={`flex justify-start items-start ${isFixedSize ? 'mb-7 mt-2' : 'mb-2 mt-1 xl:mb-7 xl:mt-2 lg:mb-5 lg:mt-2 md:mb-3 md:mt-1'}`}>
        <Button 
          type="button" 
          className={`${isFixedSize 
            ? 'blue-deep-gradient text-white font-bold uppercase text-base w-30 h-12 px-6 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out' 
            : BUTTON_DESIGN.EXPLORER_BUTTON}`}
          onClick={handleClickButton}
        >
          Explorar
        </Button>
      </div>
      
    </div>
  )
})

export default InventoryCard
