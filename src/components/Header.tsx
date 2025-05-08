import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { SOCIAL_NETWORKS } from '../constants/social_networks';
import { useModal } from '../context/ModalContext';
import Icon from './icon/Icon';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            openModal('login')
        }
    };

    return (
        <>
            <header className="blue-deep-gradient shadow-md">
                <nav className="mx-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center xl:space-x-8 lg:space-x-7 md:space-x-5 sm:space-x-3">
                            <div className="flex items-center gap-2">
                                <img src="/icono.png" alt="Logo" className="h-8 w-8 xl:h-12 xl:w-12 lg:h-10 lg:w-10 md:h-8 md:w-8 sm:h-6 sm:w-6" />
                                <Link to="/" className="text-base xl:text-2xl lg:text-xl md:text-base text-logo-light flex items-center gap-2 font-bahamas-bold">
                                    YANCA PUBLICIDAD
                                </Link>
                            </div>
                            <div className="hidden md:flex xl:space-x-8 lg:space-x-7 md:space-x-5 sm:space-x-3">
                                <Link to="/" className="text-menu-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300">
                                    PRODUCTOS
                                </Link>
                                <Link to="/about" className="text-menu-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300">
                                    SERVICIOS
                                </Link>
                                <Link to="/services" className="text-menu-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300">
                                    QUIENES SOMOS
                                </Link>
                                <Link to="/contact" className="text-menu-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300">
                                    CONTACTANOS
                                </Link>
                                <Link to="/contact" className="text-menu-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300">
                                    MIS COTIZACIONES
                                </Link>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center xl:space-x-5 lg:space-x-4 md:space-x-3">
                            <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-logo-light transition-colors hover:scale-110 transform duration-300">
                                <Icon 
                                    name="facebook"
                                    className="xl:h-5 xl:w-5 lg:h-4 lg:w-4 md:h-3.5 md:w-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                            <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-logo-light transition-colors hover:scale-110 transform duration-300">
                                <Icon 
                                    name="instagram"
                                    className="xl:h-5 xl:w-5 lg:h-4 lg:w-4 md:h-3.5 md:w-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                            <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-logo-light transition-colors hover:scale-110 transform duration-300">
                                <Icon 
                                    name="linkedin"
                                    className="xl:h-5 xl:w-5 lg:h-4 lg:w-4 md:h-3.5 md:w-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                            <a href="#" onClick={handleProfileClick} className="text-logo-light transition-colors hover:scale-110 transform duration-300">
                                <Icon 
                                    name="profile"
                                    className="xl:h-5 xl:w-5 lg:h-4 lg:w-4 md:h-3.5 md:w-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button 
                                onClick={toggleMenu}
                                className="text-white hover:text-gray-900 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <Icon 
                                        name="close"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                ) : (
                                    <Icon 
                                        name="toggle"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/" className="block px-3 py-2 rounded-md text-xs font-medium text-menu-light hover:text-gray-900 hover:bg-gray-50">
                                PRODUCTOS
                            </Link>
                            <Link to="/about" className="block px-3 py-2 rounded-md text-xs font-medium text-menu-light hover:text-gray-900 hover:bg-gray-50">
                                SERVICIOS
                            </Link>
                            <Link to="/services" className="block px-3 py-2 rounded-md text-xs font-medium text-menu-light hover:text-gray-900 hover:bg-gray-50">
                                QUIENES SOMOS
                            </Link>
                            <Link to="/contact" className="block px-3 py-2 rounded-md text-xs font-medium text-menu-light hover:text-gray-900 hover:bg-gray-50">
                                CONTACTANOS
                            </Link>
                            <Link to="/contact" className="block px-3 py-2 rounded-md text-xs font-medium text-menu-light hover:text-gray-900 hover:bg-gray-50">
                                MIS COTIZACIONES
                            </Link>
                            <div className="flex space-x-3 px-3 py-2">
                                <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="facebook"
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                                <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="instagram"
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                                <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="linkedin"
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                                <a href="#" onClick={handleProfileClick} className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="profile"
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
