import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductById } from '../../hooks/useGetProductById';
import ProductColorsPriceCard from '../../components/products/ProductColorsPriceCard';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../components/modals/LoginModal';
import BackButton from '../../components/BackButton';

// Componente BackBut

const ProductView: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data: product, isLoading, error } = useGetProductById(productId ?? '');
    const { isAuthenticated } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    if (!productId) {
        return <div>Product ID not found</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!product) {
        return <div>No product found</div>;
    }

    // Handlers para login/register
    const handleOpenLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleSwitchToRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };
    const handleCloseRegister = () => setShowRegister(false);

    return (
        <div className='flex justify-center items-center blue-deep-gradient-wo-hover min-h-screen'>
            <BackButton />
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start justify-center py-20 px-4 md:px-16 bg-white mt-10 rounded-xl h-[70vh]">
                {/* Imagen producto */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-w-xs md:max-w-md object-contain rounded-lg shadow-md"
                    />
                    {/* Mensaje rojo si no logueado */}
                    {!isAuthenticated && (
                        <div className="mt-4 text-red-600 font-bold italic text-lg text-center animate-pulse">
                            Debes estar logueado para cotizar
                        </div>
                    )}
                </div>

                {/* Info producto */}
                <div className="flex-1 max-w-xl w-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">{product.name}</h1>
                    <p className="mb-4 text-gray-700">{product.description}</p>
                    <ul className="mb-4 text-gray-700 text-sm list-disc pl-5">
                        <li><b>MATERIAL:</b> {product.material}</li>
                        <li><b>MEDIDAS:</b> {product.size} cm</li>
                        <li><b>ÁREA DE IMPRESIÓN APROXIMADA:</b> {product.printingArea}</li>
                        <li><b>MARCA:</b> {product.printingMethod}</li>
                        <li><b>EMPAQUE:</b> {product.boxContent}</li>
                    </ul>
                    <div className="mb-4">
                        <span className="font-semibold">Colores disponibles:</span>
                        <ProductColorsPriceCard colors={product.colors} price={product.price} />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-gray-700 mb-1">Cotiza aquí tu producto Marcado:</span>
                        {isAuthenticated ? (
                            <Button
                                type="button"
                                className="w-full md:w-auto px-8 py-3 rounded-full font-bold text-lg blue-deep-gradient text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200"
                            >
                                REALIZAR COTIZACIÓN
                                {/* Aquí podrías poner un ícono de mano si lo tienes */}
                                <span role="img" aria-label="hand">🖱️</span>
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                className="w-full md:w-auto px-8 py-3 rounded-full font-bold text-lg blue-deep-gradient text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-200"
                                onClick={handleOpenLogin}
                            >
                                REALIZAR COTIZACIÓN
                                <span role="img" aria-label="hand">🖱️</span>
                            </Button>
                        )}
                    </div>
                </div>
                {/* Modal login */}
                <LoginModal isOpen={showLogin} onClose={handleCloseLogin} onSwitchToRegister={handleSwitchToRegister} />
                {/* Aquí podrías agregar RegisterModal si lo necesitas */}
            </div>
        </div>
    );
}

export default ProductView;