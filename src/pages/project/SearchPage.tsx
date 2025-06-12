import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSearchProductsByName } from "../../hooks/useSearchProductsByName";
import ProductList from "../../components/products/ProductList";

const SearchPage: React.FC = () => {
    const location = useLocation();
    const searchQuery = location.state?.searchQuery || "";
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const { data, isLoading, error } = useSearchProductsByName(searchQuery, page, pageSize);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(0); // Reset to first page when changing page size
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen blue-deep-gradient-wo-hover">
            <div className="container my-10 flex flex-col items-center justify-center p-8 bg-white rounded-2xl">
                <h1 className="text-2xl font-bold text-black mb-6">
                    Resultados de búsqueda para: {searchQuery}
                </h1>
                
                {isLoading && (
                    <div className="text-white">Cargando resultados...</div>
                )}

                {error && (
                    <div className="text-red-500">
                        Error al cargar los resultados: {error.message}
                    </div>
                )}

                {data && (
                    <div className="flex justify-center w-full">
                        <ProductList 
                            products={data}
                            classname="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    </div>
                )}

                {data?.content.length === 0 && (
                    <div className="text-white">
                        No se encontraron resultados para tu búsqueda.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;