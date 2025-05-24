import { ReactElement, useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { SOCIAL_NETWORKS } from '../constants/social_networks';
import { useModal } from '../context/ModalContext';
import Icon from './icon/Icon';
import Button from './Button';

const NAV_LINKS = [
    { label: 'PRODUCTOS', path: '/inventories' },
    { label: 'SERVICIOS', path: '/about' }, 
    { label: 'QUIENES SOMOS', path: '/services' },
    { label: 'CONTACTANOS', path: '/contact-us' },
];

const SOCIAL_ICONS = [
    { name: 'facebook', href: SOCIAL_NETWORKS.FACEBOOK },
    { name: 'instagram', href: SOCIAL_NETWORKS.INSTAGRAM },
    { name: 'linkedin', href: SOCIAL_NETWORKS.LINKEDIN },
];

const tabClass = "text-menu-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300";
const tabMobileClass = "block px-3 py-2 rounded-md text-xs font-medium text-menu-light hover:text-gray-900 hover:bg-gray-50";
const iconClass = "text-logo-light xl:text-base lg:text-sm md:text-xs hover:scale-110 transform transition duration-300";
const iconMobileClass = "text-logo-light hover:scale-110 transform transition duration-300";
const iconSize = "h-4 w-4 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 xl:h-5 xl:w-5";

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openModal(isAuthenticated ? 'user' : 'login');
    };

    const renderNavLink = (link: { label:string, path:string}, className: string): ReactElement => (
        <Link key={link.label} to={link.path} className={className}>
            {link.label}
        </Link>
    );

    const renderIcon = (icon: { name:string, href:string }, className: string): ReactElement => (
        <a 
            key={icon.name}
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            <Icon 
                name={icon.name}
                className={iconSize}
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
            />
        </a>
    );

    const renderProfileIcon = (): ReactElement => {
        return(
            <div className="flex items-center gap-4 relative">
                <Button 
                    type="button"
                    onClick={handleProfileClick} 
                    className="text-logo-light hover:scale-110 transform transition duration-300"
                    aria-label="Profile"
                >
                    <Icon 
                        name="profile"
                        className="h-4 w-4 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 xl:h-5 xl:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    />
                </Button>
            </div>
        );
    };

    return (
        <>
            <header className="blue-deep-gradient-wo-hover shadow-md">
                <nav className="mx-8 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo and Navigation Links */}
                        <div className="flex items-center justify-center xl:space-x-8 lg:space-x-7 md:space-x-5 sm:space-x-3">
                            <div className="flex items-center gap-2">
                                <img src="/icono.png" alt="Logo" className="h-8 w-8 xl:h-12 xl:w-12 lg:h-10 lg:w-10 md:h-8 md:w-8 sm:h-6 sm:w-6" />
                                <Link to="/" className="text-base xl:text-2xl lg:text-xl md:text-base text-logo-light flex items-center gap-2 font-bahamas-bold">
                                    YANCA PUBLICIDAD
                                </Link>
                            </div>
                            <div className="hidden md:flex xl:space-x-8 lg:space-x-7 md:space-x-5 sm:space-x-3">
                                { NAV_LINKS.map(link => renderNavLink(link, tabClass)) }
                                { isAuthenticated && renderNavLink({ label: 'MIS COTIZACIONES', path: '/contact' }, tabClass) }
                            </div>
                        </div>
                        {/* Desktop Profile Icon & Dropdown */}
                        <div className="hidden md:flex items-center xl:space-x-5 lg:space-x-4 md:space-x-3 relative">
                            { SOCIAL_ICONS.map(icon => renderIcon(icon, iconClass)) }
                            { renderProfileIcon() }
                        </div>
                        {/* Mobile Menu Toggle */}
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
                            { NAV_LINKS.map(link => renderNavLink(link, tabMobileClass)) }
                            { isAuthenticated && renderNavLink({ label: 'MIS COTIZACIONES', path: '/contact' }, tabMobileClass) }
                            <div className="flex space-x-3 px-3 py-2">
                                { SOCIAL_ICONS.map(icon => renderIcon(icon, iconMobileClass)) }
                                { renderProfileIcon() }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
