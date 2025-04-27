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
            <header className="bg-background-secondary  shadow-md">
                <nav className="mx-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center justify-center space-x-8">
                            <div className='flex items-center gap-2'>
                                <img src="/logo_favicon.png" alt="Logo" className="h-8 w-auto" />
                                <Link to="/" className="md:text-2xl text-logo-light flex items-center gap-2 font-bahamas-bold">
                                    YANCA PUBLICIDAD
                                </Link>
                            </div>
                            <div className="hidden md:flex space-x-8">
                                <Link to="/" className="text-menu-light hover:scale-110 transform transition duration-300">
                                    Productos
                                </Link>
                                <Link to="/about" className="text-menu-light hover:scale-110 transform transition duration-300">
                                    Servicios
                                </Link>
                                <Link to="/services" className="text-menu-light hover:scale-110 transform transition duration-300">
                                    Quienes somos
                                </Link>
                                <Link to="/contact" className="text-menu-light hover:scale-110 transform transition duration-300">
                                    Contactanos
                                </Link>
                                <Link to="/contact" className="text-menu-light hover:scale-110 transform transition duration-300">
                                    Mis cotizaciones
                                </Link>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-5">
                            <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <Icon 
                                    name="facebook"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                            <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <Icon 
                                    name="instagram"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                            <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <Icon 
                                    name="linkedin"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                            <a href="#" onClick={handleProfileClick} className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <Icon 
                                    name="profile"
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button 
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
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
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Productos
                            </Link>
                            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Servicios
                            </Link>
                            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Quienes somos
                            </Link>
                            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                                Contactanos
                            </Link>
                            <div className="flex space-x-4 px-3 py-2">
                                <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="facebook"
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                                <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="instagram"
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                                <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="linkedin"
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    />
                                </a>
                                <a href="#" onClick={handleProfileClick} className="text-logo-light hover:text-gray-900">
                                    <Icon 
                                        name="profile"
                                        className="h-5 w-5"
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
