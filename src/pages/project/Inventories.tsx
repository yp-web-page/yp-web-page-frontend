import React from "react";

import InventoryList from "../../components/products/InventoryList";
import LoadingInformation from "../../components/homepage/LoadingInformation";
import LoadingError from "../../components/homepage/LoadingError";
import { useGetAllInventoriesInfo } from "../../hooks/useGetAllInventoriesInfo";

const Inventories: React.FC = () => {

    const { data: inventories, isLoading, isError, error } = useGetAllInventoriesInfo()
    const inventoryListStyle = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-7 pl-1 pr-1"

    return (
        <div className="flex justify-center py-20 blue-deep-gradient-wo-hover">
            <div className="container flex flex-col justify-center items-center w-screen py-10 bg-white rounded-2xl">
                {isLoading && <LoadingInformation />}
                {isError && <LoadingError error={error instanceof Error ? error.message : String(error)} />}
                <h1 className="xl:text-2xl lg:text-xl md:text-lg text-black font-semibold mb-10">
                    CATALOGO DE ÁRTICULOS PUBLICITARIOS
                </h1>
                <InventoryList inventories={inventories || []} classname={inventoryListStyle} isFixedSize={true}/>    
            </div>
        </div>
    )
}

export default Inventories