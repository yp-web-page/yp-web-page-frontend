import React, { useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { useGetInventoryView } from "../../hooks/useGetInventoryView"
import { useGetListView } from "../../hooks/useGetListView"
import ProductList from "../../components/products/ProductList"
import BackButton from "../../components/BackButton"

const Inventory: React.FC = () => {
    const { inventoryId } = useParams<{ inventoryId: string }>();
    const location = useLocation();
    const listId: string | undefined = location.state?.listId
    const [selectedListId, setSelectedListId] = useState<string>(listId || '');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);

    const { data: inventoryView, isLoading: isLoadingInventoryView } = useGetInventoryView(inventoryId || '');
    const { data: listView, isLoading: isLoadingListView } = useGetListView(selectedListId, currentPage, pageSize);

    if (isLoadingInventoryView) {
        return <div>Loading...</div>;
    }

    if (!inventoryId) {
        return <div>No inventory ID provided</div>;
    }

    const handleListChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedListId(event.target.value);
        setCurrentPage(0); // Reset to first page when changing lists
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(0); // Reset to first page when changing page size
    };

    return (
        <div className="min-h-screen blue-deep-gradient-wo-hover flex items-start justify-center py-8">
            <BackButton/>
            {/* Sidebar azul */}
            <aside className="w-64 min-h-[200px] bg-white text-black rounded-lg flex flex-col p-6 mr-6">
                <h2 className="text-lg font-semibold mb-6">{inventoryView?.title || 'Inventario'}</h2>
                {inventoryView && (
                    <div className="relative w-full">
                        <select
                            value={selectedListId}
                            onChange={handleListChange}
                            className="w-full h-10 p-2 mb-2 bg-transparent text-black focus:outline-none focus:ring-0 appearance-none pr-10 border-b-2 border-black"
                        >
                            <option value="" className="text-black">Selecciona una lista</option>
                            {inventoryView.lists?.map((list) => (
                                <option key={list.id} value={list.id} className="text-black">
                                    {list.name}
                                </option>
                            ))}
                        </select>
                        {/* Flecha personalizada */}
                        <div className="pointer-events-none absolute right-0 top-1/3 transform -translate-y-1/3 flex items-center px-3">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                )}
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 bg-white rounded-lg shadow-lg p-10 min-h-[500px] max-w-5xl w-full">
                <h1 className="text-3xl text-black font-semibold mb-2">{listView?.name || 'Inventario'}</h1>
                <p className="text-gray-500 mb-8">Mostrando productos de la lista seleccionada</p>
                {isLoadingListView ? (
                    <div>Loading list products...</div>
                ) : listView && listView.products ? (
                    <ProductList
                        products={listView.products}
                        classname="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                ) : (
                    <div>No hay productos disponibles para la lista seleccionada</div>
                )}
            </main>
        </div>
    );
}

export default Inventory