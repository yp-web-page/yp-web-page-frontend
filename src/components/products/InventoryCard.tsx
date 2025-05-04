import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import Button from '../Button'
import { ResponseInventoriesInfo } from '../../types/inventory'
import { BUTTON_DESIGN } from '../../constants/buttonDesign'



const InventoryCard: React.FC<{ inventory: ResponseInventoriesInfo }> = ({ inventory: { id, title, imagePath, lists } }) => {

  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate(`/inventory/${id}`)
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat xl:h-90 xl:w-90 lg:h-80 lg:w-80 md:w-60 md:h-60 flex flex-col pl-2 md:pl-5 justify-end" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagePath})` }}>
      <h1 className="text-left font-bold w-full text-xxs sm:text-xs xl:text-xl lg:text-base md:text-sm uppercase mb-2">
        {title}
      </h1>
      
      <div className="w-full pb-2 pl-5">
        {
          lists.map((item, index) => (
            <ul key={index} className="list-disc text-left -my-2 lg:-my-0.5 md:-my-1">
              <li className='text-gray-200 marker:text-white marker:text-xxs'>
                <Link to={`/inventory/${id}`} state={{ listId: item.id }} className="text-gray-200 hover:text-white text-xxs md:text-xs lg:text-sm xl:text-base">
                  {item.name}
                </Link>
              </li>
            </ul>
          ))
        }
      </div>
      <div className="flex justify-start items-start mb-2 mt-1 xl:mb-7 xl:mt-2 lg:mb-5 lg:mt-2 md:mb-3 md:mt-1">
        <Button 
          type="button" 
          className={BUTTON_DESIGN.EXPLORER_BUTTON}
          onClick={handleClickButton}
        >
          Explorar
        </Button>
      </div>
    </div>
  )
}

export default InventoryCard
