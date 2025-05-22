import React from "react"

import { useParams, useLocation } from "react-router-dom"
import { useGetInventoryView } from "../../hooks/useGetInventoryView"

const Inventory: React.FC = () => {
    const { inventoryId } = useParams<{ inventoryId: string }>();
    const location = useLocation();
    const listId: string | undefined = location.state?.listId

    const { data: inventoryView, isLoading: isLoadingInventoryView } = useGetInventoryView(inventoryId || '');

    if (isLoadingInventoryView) {
        return <div>Loading...</div>;
    }

    if (!inventoryId) {
        return <div>No inventory ID provided</div>;
    }

    return (
        <div>
            <h1>Inventory Page</h1>
            <p>This is the inventory page for ID: {inventoryId} and listId {listId}</p>
            {inventoryView && (
                <div>
                    <h2>Inventory Details</h2>
                    <pre>{JSON.stringify(inventoryView, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Inventory