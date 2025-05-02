import React from 'react'

import { SERVICE_INFORMATION, SERVICE_INFORMATION_IMAGES } from '../constants/service_information'

const ServiceInformation: React.FC = () => {

  return (
    <div className="w-full bg-background-tertiary">
      <div className="hidden md:flex container mx-auto items-start justify-between bg-background-tertiary py-24 px-24 space-x-16" >
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.CUTTING_AND_LASER_GRAVING}
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
            <h1 className="text-title-light font-bold text-lg">
            {SERVICE_INFORMATION.CUTTING_AND_LASER_GRAVING.title}
            </h1>
          <p className="text-text-light text-xs text-center">
            {SERVICE_INFORMATION.CUTTING_AND_LASER_GRAVING.description}
          </p>
        </div> 
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.PRINTING_ON_RIGID_SURFACES}
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold text-lg">
            {SERVICE_INFORMATION.PRINTING_ON_RIGID_SURFACES.title}
          </h1>
          <p className="text-text-light text-xs text-center">
            {SERVICE_INFORMATION.PRINTING_ON_RIGID_SURFACES.description}
          </p>
        </div>
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.DTF_PRINTING}
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold text-lg">
            {SERVICE_INFORMATION.DTF_PRINTING.title}
          </h1>
          <p className="text-text-light text-xs text-center">
            {SERVICE_INFORMATION.DTF_PRINTING.description}
          </p>
        </div>
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.SUBLIMATION}
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold text-lg">
            {SERVICE_INFORMATION.SUBLIMATION.title}
          </h1>
          <p className="text-text-light text-xs text-center">
            {SERVICE_INFORMATION.SUBLIMATION.description}
          </p>
        </div>
      </div>
      <div className='md:hidden container mx-auto grid grid-cols-2 gap-4 py-8 px-10 place-items-center'>
        <div className="flex flex-col w-full justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.CUTTING_AND_LASER_GRAVING}
            alt="Service icon"
            className="w-8 h-8 mb-2"
          />
            <h1 className="text-title-light font-bold text-xs text-center">
            {SERVICE_INFORMATION.CUTTING_AND_LASER_GRAVING.title}
            </h1>
        </div>
        <div className="flex flex-col w-full justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.PRINTING_ON_RIGID_SURFACES}
            alt="Service icon"
            className="w-8 h-8 mb-2"
          />
          <h1 className="text-title-light font-bold text-xs text-center">
            {SERVICE_INFORMATION.PRINTING_ON_RIGID_SURFACES.title}
          </h1>
        </div>
        <div className="flex flex-col w-full justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.DTF_PRINTING}
            alt="Service icon"
            className="w-8 h-8 mb-2"
          />
          <h1 className="text-title-light font-bold text-xs text-center">
            {SERVICE_INFORMATION.DTF_PRINTING.title}
          </h1>
        </div>
        <div className="flex flex-col w-full justify-top items-center">
          <img 
            src={SERVICE_INFORMATION_IMAGES.SUBLIMATION}
            alt="Service icon"
            className="w-8 h-8 mb-2"
          />
          <h1 className="text-title-light font-bold text-xs text-center">
            {SERVICE_INFORMATION.SUBLIMATION.title}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default ServiceInformation
