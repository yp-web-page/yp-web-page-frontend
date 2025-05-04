import React from "react"

import { useParams, useLocation } from "react-router-dom"

const Inventory: React.FC = () => {

    const { inventoryId } = useParams<{ inventoryId: string }>();
    const location = useLocation();
    const listId: string | undefined = location.state?.listId

    return (
        <div>
        <h1>Inventory Page</h1>
        <p>This is the inventory page for ID: {inventoryId} and listId {listId} </p>
        </div>
    );
}

export default Inventory