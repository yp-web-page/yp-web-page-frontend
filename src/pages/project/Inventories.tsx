import React from "react";

import InventoryList from "../../components/products/InventoryList";
import LoadingInformation from "../../components/homepage/LoadingInformation";
import LoadingError from "../../components/homepage/LoadingError";
import { useGetAllInventoriesInfo } from "../../hooks/useGetAllInventoriesInfo";

const Inventories: React.FC = () => {

    const { data: inventories, isLoading, isError, error } = useGetAllInventoriesInfo()

    return (
        <>
            {isLoading && <LoadingInformation />}
            {isError && <LoadingError error={error instanceof Error ? error.message : String(error)} />}
            <InventoryList inventories={inventories || []}/>    
        </>
    )
}

export default Inventories