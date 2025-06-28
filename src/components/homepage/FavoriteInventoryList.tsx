import React from "react"

import { useGetInventoriesInfo } from "../../hooks/useGetInventoriesInfo"
import InventoryList from "../products/InventoryList"
import LoadingInformation from "./LoadingInformation"
import LoadingError from "./LoadingError"

const FavoriteInventoryList: React.FC = () => {

    const { data: inventories, isLoading, isError, error } = useGetInventoriesInfo();

    const inventoryListStyle = "grid grid-cols-3 gap-3 md:gap-7 pl-1 pr-1"

    return (
        <>
        {isLoading && <LoadingInformation />}
        {isError && <LoadingError error={error instanceof Error ? error.message : String(error)} />}
        {inventories && inventories.length > 0 ? (
        <div className='bg-white'>
            <div className='container flex mx-auto items-center justify-center bg-white'>
                <InventoryList inventories={inventories} classname={inventoryListStyle} />
            </div>
        </div>
        ) : (
                <div className="flex justify-center items-center w-screen bg-white">
                    <p className="text-black">
                        No hay productos disponibles
                    </p>  
                </div>
        )}
        </>
    )
}

export default FavoriteInventoryList