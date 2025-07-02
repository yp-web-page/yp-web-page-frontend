import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductById } from '../../hooks/useGetProductById';
import ProductColorsPriceCard from '../../components/products/ProductColorsPriceCard';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/BackButton';
import { useModal } from '../../context/ModalContext';
import LoadingSpinner from '../../components/LoadingSpinner';

// Componente BackBut

const ProductView: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data: product, isLoading, error } = useGetProductById(productId ?? '');
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();

    if (!productId) {
        return <div>Product ID not found</div>;
    }
    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!product) {
        return <div>No product found</div>;
    }

    // Handlers para login/register
    const handleOpenLoginModal = () => openModal('login');
    const handleOpenQuotationModal = () => {
        console.log('Opening quotation modal for product:', product.name);
        openModal('quotation', undefined, undefined, product);
    };

    return (
        <div className='flex justify-center items-center blue-deep-gradient-wo-hover min-h-screen'>
            <BackButton />
            <div className="flex flex-col justify-center items-center md:flex-row gap-8 md:gap-16 items-start justify-center py-20 px-4 md:px-16 bg-white mt-10 rounded-xl h-[70vh] w-[80vw]">
                {/* Imagen producto */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-w-[220px] md:max-w-[320px] lg:max-w-[400px] h-auto max-h-[220px] md:max-h-[320px] lg:max-h-[400px] object-contain rounded-lg shadow-md"
                    />
                    
                </div>

                {/* Info producto */}
                <div className="flex-1 max-w-xl w-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">{product.name}</h1>
                    <p className="mb-4 text-gray-700">{product.description}</p>
                    <ul className="mb-4 text-gray-700 text-sm list-disc pl-5">
                        <li><b>MATERIAL:</b> {product.material}</li>
                        <li><b>MEDIDAS:</b> {product.size} cm</li>
                        <li><b>ÁREA DE IMPRESIÓN APROXIMADA:</b> {product.printingArea}</li>
                        <li><b>MARCA:</b> {product.printingMethods[0]?.name || 'No especificado'}</li>
                        <li><b>EMPAQUE:</b> {product.boxContent}</li>
                    </ul>
                    <div className="mb-4">
                        <span className="font-semibold">Colores disponibles:</span>
                        <ProductColorsPriceCard colors={product.colors} price={product.price} />
                    </div>
                    {/* NUEVO DISEÑO DEL BOTÓN DE COTIZACIÓN */}
                    <div className="flex flex-col items-center w-full">
                        <span className="text-xs text-gray-600 mb-1 text-center w-full">Cotiza aquí tu producto Marcado:</span>
                        <div className="flex items-center w-full">
                            <Button
                                type="button"
                                onClick={isAuthenticated ? handleOpenQuotationModal : handleOpenLoginModal}
                                className="blue-deep-gradient text-white font-extrabold rounded-full shadow-lg px-8 py-2 text-base md:text-lg tracking-wide w-full flex-1 flex justify-center items-center transition-colors duration-300 hover:bg-blue-800"
                            >
                                REALIZAR COTIZACIÓN
                            </Button>
                        </div>
                        {/* Mensaje rojo si no logueado */}
                        {!isAuthenticated && (
                            <div className="mt-4 text-red-600 font-bold italic text-lg text-center animate-pulse">
                                Debes estar logueado para cotizar
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductView;