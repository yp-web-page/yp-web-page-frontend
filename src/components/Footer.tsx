import React from 'react';
import { Link } from 'react-router';
import { SOCIAL_NETWORKS, CONTACT_INFO } from '../constants/social_networks';
import Icon from './icon/Icon';

type Column = { title: string; items: { label: string; to?: string; href?: string }[] };

const COLS: Column[] = [
    {
        title: 'Productos',
        items: [
            { label: 'Tarjetas y papelería', to: '/inventarios' },
            { label: 'Promocionales', to: '/inventarios' },
            { label: 'Textiles DTF', to: '/inventarios' },
            { label: 'Sublimación', to: '/inventarios' },
            { label: 'Acrílico y MDF', to: '/inventarios' },
        ],
    },
    {
        title: 'Servicios',
        items: [
            { label: 'Corte y grabado láser' },
            { label: 'Impresión sobre rígidos' },
            { label: 'Sublimación' },
            { label: 'Diseño gráfico' },
            { label: 'Asesoría empresarial' },
        ],
    },
    {
        title: 'Compañía',
        items: [
            { label: 'Quiénes somos', to: '/quienes-somos' },
            { label: 'Contáctanos', to: '/contactanos' },
            { label: 'Aviso Legal', to: '/aviso-legal' },
            { label: 'Políticas de Privacidad', to: '/politicas-privacidad' },
        ],
    },
];

const SOCIALS: { name: string; href: string }[] = [
    { name: 'facebook', href: SOCIAL_NETWORKS.FACEBOOK },
    { name: 'instagram', href: SOCIAL_NETWORKS.INSTAGRAM },
    { name: 'whatsapp', href: SOCIAL_NETWORKS.WHATSAPP },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#001428] text-white">
            <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-10">
                <div className="grid lg:grid-cols-12 gap-12 mb-12">
                    {/* Brand + contacto */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3">
                            <img src="/icono.png" alt="" className="h-12 w-12 object-contain" />
                            <div className="font-bahamas-bold text-[18px] tracking-wide">YANCA PUBLICIDAD</div>
                        </div>
                        <p className="mt-5 text-white/65 text-[14px] leading-relaxed max-w-[340px]">
                            Más de 20 años de experiencia en publicidad y marcación. Producción profesional, asesoría
                            personalizada y artículos promocionales para empresas.
                        </p>
                        <div className="mt-6 grid gap-3">
                            <div className="flex items-start gap-3 text-[13px] text-white/80">
                                <span className="size-9 rounded-full bg-white/10 grid place-items-center shrink-0 mt-0.5">
                                    <Icon name="map" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                </span>
                                <div>
                                    <div className="font-semibold">{CONTACT_INFO.CITY}</div>
                                    <div className="text-white/55 text-[12px]">Atención en sede y a nivel nacional</div>
                                </div>
                            </div>
                            <a href={CONTACT_INFO.PHONE_HREF} className="flex items-start gap-3 text-[13px] text-white/80 hover:text-white transition">
                                <span className="size-9 rounded-full bg-white/10 grid place-items-center shrink-0 mt-0.5">
                                    <Icon name="phone" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                </span>
                                <div>
                                    <div className="font-semibold">Tel. {CONTACT_INFO.PHONE}</div>
                                    <div className="text-white/55 text-[12px]">{CONTACT_INFO.HOURS_LONG}</div>
                                </div>
                            </a>
                            <a href={CONTACT_INFO.WHATSAPP_HREF} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-[13px] text-white/80 hover:text-white transition">
                                <span className="size-9 rounded-full bg-white/10 grid place-items-center shrink-0 mt-0.5">
                                    <Icon name="whatsapp" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                </span>
                                <div>
                                    <div className="font-semibold">WhatsApp {CONTACT_INFO.WHATSAPP_NUMBER}</div>
                                    <div className="text-white/55 text-[12px]">Cotizaciones inmediatas</div>
                                </div>
                            </a>
                            <a href={CONTACT_INFO.EMAIL_HREF} className="flex items-start gap-3 text-[13px] text-white/80 hover:text-white transition">
                                <span className="size-9 rounded-full bg-white/10 grid place-items-center shrink-0 mt-0.5">
                                    <Icon name="mail" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                </span>
                                <div>
                                    <div className="font-semibold">{CONTACT_INFO.EMAIL}</div>
                                    <div className="text-white/55 text-[12px]">Dudas &amp; cotizaciones</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Columnas de links */}
                    <div className="lg:col-span-5 grid sm:grid-cols-3 gap-8">
                        {COLS.map((c) => (
                            <div key={c.title}>
                                <div className="font-mono text-[10.5px] tracking-[0.25em] text-accent mb-4">
                                    {c.title.toUpperCase()}
                                </div>
                                <ul className="grid gap-2.5">
                                    {c.items.map((item) => (
                                        <li key={item.label}>
                                            {item.to ? (
                                                <Link to={item.to} className="text-[13px] text-white/70 hover:text-white transition">
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span className="text-[13px] text-white/70">{item.label}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Redes */}
                    <div className="lg:col-span-3">
                        <div className="font-mono text-[10.5px] tracking-[0.25em] text-accent mb-4">SÍGUENOS</div>
                        <p className="text-[13px] text-white/65 leading-relaxed">
                            Conéctate con nosotros en nuestras redes y mantente al día con nuestros últimos trabajos.
                        </p>
                        <div className="mt-6 flex items-center gap-2">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.name}
                                    className="size-10 rounded-full bg-white/10 hover:bg-accent hover:text-yp-deep grid place-items-center transition"
                                >
                                    <Icon name={s.name} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-[12px] text-white/50">
                        © {new Date().getFullYear()} Yanca Publicidad. Todos los derechos reservados.
                    </div>
                    <div className="flex items-center gap-5 text-[12px] text-white/60">
                        <Link to="/aviso-legal" className="hover:text-white transition">Aviso Legal</Link>
                        <span className="text-white/20">·</span>
                        <Link to="/politicas-privacidad" className="hover:text-white transition">Políticas de Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
