import React from "react"

import { useGetInventoriesInfo } from "../../hooks/useGetInventoriesInfo"
import InventoryList from "../products/InventoryList"

const FavoriteInventoryList: React.FC = () => {

    const { data, isLoading, isError, error } = useGetInventoriesInfo();
    const inventories = data

    return (
        <>
        {isLoading && <div className="text-center">Cargando...</div>}
        {isError && <div className="text-center">Error: {error.message}</div>}
        {inventories? (
        <div className='bg-white'>
            <div className='container flex mx-auto items-center justify-center bg-white'>
                <InventoryList inventories={inventories} />
            </div>
        </div>
        ) : (
                <div className="text-center">No hay productos disponibles</div>
        )}
        </>
    )
}

export default FavoriteInventoryList