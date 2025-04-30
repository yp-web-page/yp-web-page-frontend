import React from 'react'

const ServiceInformation: React.FC = () => {

  return (
    <div className="w-full bg-background-tertiary">
      <div className="container mx-auto flex items-start justify-between bg-background-tertiary py-24 px-24 space-x-16" >
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src="https://www.yancapublicidad.com/wp-content/uploads/2024/02/GRABADO-LASER-150x150.png"
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold">
            CORTE Y GRABADO LASER
          </h1>
          <p className="text-text-light text-sm text-justify">
            ¡Dale vida a tus ideas con nuestro servicio de corte y grabado láser! Precisión insuperable en diversos materiales
          </p>
        </div> 
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src="https://www.yancapublicidad.com/wp-content/uploads/2024/02/IMPRESION-UV-LED-150x150.png"
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold">
            IMPRESIÓN SOBRE RIGIDOS
          </h1>
          <p className="text-text-light text-sm text-justify">
            Descubre la versatilidad de nuestra impresión UV-LED para proyectos impactantes y respetuosos con el medio ambiente
          </p>
        </div>
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src="https://www.yancapublicidad.com/wp-content/uploads/2024/02/ICONO-STIKERT-150x150.png"
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold">
            IMPRESIÓN DTF UV
          </h1>
          <p className="text-text-light text-sm text-justify">
            Conoce nuestro novedoso servicio con colores vibrantes, un terminado excepcional y versatilidad en diversos sustratos
          </p>
        </div>
        <div className="flex flex-col w-1/5 justify-top items-center">
          <img 
            src="https://www.yancapublicidad.com/wp-content/uploads/2024/02/SUBLIMACION-150x150.png"
            alt="Service icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-title-light font-bold">
            SUBLIMACIÓN
          </h1>
          <p className="text-text-light text-sm text-justify">
            Sumérgete en el mundo de la sublimación. Imprime tus ideas en colores vibrantes y de alta definición
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServiceInformation
