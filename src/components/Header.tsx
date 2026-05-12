import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SOCIAL_NETWORKS, CONTACT_INFO } from '../constants/social_networks';
import { useModal } from '../context/ModalContext';
import Icon from './icon/Icon';
import Button from './Button';
import SearchDropDown from './search/SearchDropDown';

const NAV_LINKS = [
    { label: 'PRODUCTOS', path: '/inventarios' },
    { label: 'SERVICIOS', path: '/about' },
    { label: 'QUIENES SOMOS', path: '/quienes-somos' },
    { label: 'CONTACTANOS', path: '/contactanos' },
];

const SOCIAL_ICONS = [
    { name: 'facebook', href: SOCIAL_NETWORKS.FACEBOOK },
    { name: 'instagram', href: SOCIAL_NETWORKS.INSTAGRAM },
    { name: 'whatsapp', href: SOCIAL_NETWORKS.WHATSAPP },
];

const TopStrip = () => (
    <div className="bg-yp-deep text-white/80 text-[11px] tracking-wide">
        <div className="max-w-[1400px] mx-auto px-6 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <a href={CONTACT_INFO.PHONE_HREF} className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition">
                    <Icon name="phone" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" />
                    {CONTACT_INFO.PHONE}
                </a>
                <a href={CONTACT_INFO.WHATSAPP_HREF} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition">
                    <Icon name="whatsapp" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" />
                    {CONTACT_INFO.WHATSAPP_NUMBER}
                </a>
                <a href={CONTACT_INFO.EMAIL_HREF} className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition">
                    <Icon name="mail" className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" />
                    {CONTACT_INFO.EMAIL}
                </a>
                <span className="md:hidden">Servicio Cali &amp; Nacional</span>
            </div>
            <div className="hidden lg:flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cotiza online en 60s
                </span>
                <span className="text-white/30">|</span>
                <span>{CONTACT_INFO.HOURS_SHORT}</span>
                <span className="text-white/30">|</span>
                <div className="flex items-center gap-1">
                    {SOCIAL_ICONS.map((s) => (
                        <a
                            key={s.name}
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={s.name}
                            className="size-6 grid place-items-center rounded-full hover:bg-white/15 text-white/75 hover:text-white transition"
                        >
                            <Icon name={s.name} className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openModal(isAuthenticated ? 'user' : 'login');
    };

    const renderNavLink = (link: { label: string; path: string }, className: string): ReactElement => (
        <Link key={link.label} to={link.path} className={className}>
            {link.label}
        </Link>
    );

    const desktopNavClass =
        'px-3 py-2 text-[12.5px] tracking-[0.06em] text-white/85 hover:text-white transition relative group';
    const mobileNavClass =
        'block px-3 py-2.5 rounded-lg text-[13px] tracking-wide text-white/90 hover:bg-white/10 transition';

    return (
        <header className="sticky top-0 z-40">
            <TopStrip />
            <div className={`yp-gradient text-white border-b border-white/10 transition-all ${scrolled ? 'shadow-2xl' : ''}`}>
                <nav className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center justify-between h-16 lg:h-[72px]">
                        <Link to="/" className="flex items-center gap-3 shrink-0">
                            <img src="/icono.png" alt="Yanca Publicidad" className="h-10 w-10 lg:h-12 lg:w-12 object-contain" />
                            <span className="font-bahamas-bold text-[16px] lg:text-[18px] tracking-wide leading-none">
                                YANCA PUBLICIDAD
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.label} to={link.path} className={desktopNavClass}>
                                    {link.label}
                                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                                </Link>
                            ))}
                            {isAuthenticated && renderNavLink({ label: 'MIS COTIZACIONES', path: '/cotizaciones' }, desktopNavClass)}
                        </div>

                        <div className="flex items-center gap-1.5">
                            <div className="hidden md:flex">
                                <SearchDropDown />
                            </div>
                            <div id="user-menu-anchor" className="hidden md:inline-flex">
                                <Button
                                    type="button"
                                    onClick={handleProfileClick}
                                    className="inline-grid place-items-center size-9 rounded-full hover:bg-white/10 transition text-white"
                                    aria-label="Cuenta"
                                >
                                    <Icon name="profile" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                                </Button>
                            </div>
                            <Link
                                to="/inventarios"
                                className="hidden md:inline-flex items-center gap-2 ml-1 bg-accent text-yp-deep font-semibold text-[12.5px] px-4 py-2.5 rounded-full hover:brightness-95 transition"
                            >
                                COTIZAR
                                <Icon name="arrowRight" className="h-3.5 w-3.5" />
                            </Link>
                            <button
                                onClick={toggleMenu}
                                className="lg:hidden p-2 text-white"
                                aria-label="Toggle menu"
                            >
                                <Icon
                                    name={isMenuOpen ? 'close' : 'toggle'}
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                />
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="lg:hidden pb-4 grid gap-1">
                            {NAV_LINKS.map((link) => renderNavLink(link, mobileNavClass))}
                            {isAuthenticated && renderNavLink({ label: 'MIS COTIZACIONES', path: '/cotizaciones' }, mobileNavClass)}
                            <Link
                                to="/inventarios"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-2 inline-flex items-center justify-center gap-2 bg-accent text-yp-deep font-semibold text-[13px] px-4 py-3 rounded-full"
                            >
                                COTIZAR AHORA
                                <Icon name="arrowRight" className="h-3.5 w-3.5" />
                            </Link>
                            <div className="flex items-center gap-2 px-3 pt-3">
                                {SOCIAL_ICONS.map((s) => (
                                    <a
                                        key={s.name}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.name}
                                        className="size-9 grid place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                                    >
                                        <Icon name={s.name} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
