import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { SOCIAL_NETWORKS } from '../constants/social_networks';
import { SVG_PATHS } from '../constants/svgPaths';
import { useModal } from '../context/ModalContext';

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
                                <Link to="/" className="text-2xl font-bold text-logo-light flex items-center gap-2">
                                    YANCA PUBLICIDAD
                                </Link>
                            </div>
                            <div className="hidden md:flex space-x-8">
                                <Link to="/" className="text-menu-light hover:text-menu-hover-light transition-colors">
                                    Productos
                                </Link>
                                <Link to="/about" className="text-menu-light hover:text-menu-hover-light transition-colors">
                                    Servicios
                                </Link>
                                <Link to="/services" className="text-menu-light hover:text-menu-hover-light transition-colors">
                                    Quienes somos
                                </Link>
                                <Link to="/contact" className="text-menu-light hover:text-menu-hover-light transition-colors">
                                    Contactanos
                                </Link>
                                <Link to="/contact" className="text-menu-light hover:text-menu-hover-light transition-colors">
                                    Cotizar
                                </Link>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-6">
                            <a href={SOCIAL_NETWORKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={SVG_PATHS.FACEBOOK}/>
                                </svg>
                            </a>
                            <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={SVG_PATHS.INSTAGRAM}/>
                                </svg>
                            </a>
                            <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-icon-hover-light transition-colors">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={SVG_PATHS.LINKEDIN}/>
                                </svg>
                            </a>
                            <a href="#" onClick={handleProfileClick} className="text-logo-light hover:text-icon-hover-light transition-colors">
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
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={SVG_PATHS.FACEBOOK}/>
                                    </svg>
                                </a>
                                <a href={SOCIAL_NETWORKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={SVG_PATHS.INSTAGRAM}/>
                                    </svg>
                                </a>
                                <a href={SOCIAL_NETWORKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-logo-light hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={SVG_PATHS.LINKEDIN}/>
                                    </svg>
                                </a>
                                <a href="#" onClick={handleProfileClick} className="text-logo-light hover:text-gray-900">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={SVG_PATHS.PROFILE} />
                                    </svg>
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
