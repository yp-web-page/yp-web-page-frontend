import React from "react"

import { useGetInventoriesInfo } from "../../hooks/useGetInventoriesInfo"
import InventoryList from "../products/InventoryList"
import LoadingInformation from "./LoadingInformation"
import LoadingError from "./LoadingError"

const FavoriteInventoryList: React.FC = () => {

    const { data, isLoading, isError, error } = useGetInventoriesInfo();
    const inventories = data

    return (
        <>
        {isLoading && <LoadingInformation />}
        {isError && <LoadingError error={error instanceof Error ? error.message : String(error)} />}
        {inventories? (
        <div className='bg-white'>
            <div className='container flex mx-auto items-center justify-center bg-white'>
                <InventoryList inventories={inventories} />
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