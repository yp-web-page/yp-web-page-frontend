import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { SOCIAL_NETWORKS } from '../constants/social_networks';
import { SVG_PATHS } from '../constants/svgPaths';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            setIsLoginModalOpen(true);
        }
    };

    return (
        <>
            <header className="bg-white shadow-md">
                <nav className="mx-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-8">
                            <a href="/yanca-publicity/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <img src="/logo_favicon.png" alt="Logo" className="h-8 w-auto" />
                                YANCA PUBLICIDAD
                            </a>
                            <div className="hidden md:flex space-x-8">
                                <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Productos
                                </a>
                                <a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Servicios
                                </a>
                                <a href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Quienes somos
                                </a>
                                <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Contactanos
                                </a>
                                <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Cotizar
                                </a>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-6">
                            <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={SVG_PATHS.FACEBOOK}/>
                                </svg>
                            </a>
                            <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={SVG_PATHS.INSTAGRAM}/>
                                </svg>
                            </a>
                            <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={SVG_PATHS.LINKEDIN}/>
                                </svg>
                            </a>
                            <a href="#" onClick={handleProfileClick} className="text-gray-600 hover:text-gray-900 transition-colors">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.PROFILE} />
                                </svg>
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button 
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Productos
                            </a>
                            <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Servicios
                            </a>
                            <a href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Quienes somos
                            </a>
                            <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Contactanos
                            </a>
                            <div className="flex space-x-4 px-3 py-2">
                                <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={SVG_PATHS.FACEBOOK}/>
                                    </svg>
                                </a>
                                <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={SVG_PATHS.INSTAGRAM}/>
                                    </svg>
                                </a>
                                <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={SVG_PATHS.LINKEDIN}/>
                                    </svg>
                                </a>
                                <a href="#" onClick={handleProfileClick} className="text-gray-600 hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.PROFILE} />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
            />
        </>
    )
}

export default Header