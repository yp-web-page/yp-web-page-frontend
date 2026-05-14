import React from 'react';
import { Link } from 'react-router-dom';
import InventoryList from '../../components/products/InventoryList';
import LoadingInformation from '../../components/homepage/LoadingInformation';
import LoadingError from '../../components/homepage/LoadingError';
import Icon from '../../components/icon/Icon';
import { useGetAllInventoriesInfo } from '../../hooks/useGetAllInventoriesInfo';
import { CONTACT_INFO } from '../../constants/social_networks';

const Inventories: React.FC = () => {
    const { data: inventories, isLoading, isError, error } = useGetAllInventoriesInfo();

    return (
        <>
            {/* Hero */}
            <section className="relative yp-gradient-radial text-white overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-14 relative">
                    <h1 className="font-display font-black text-[40px] lg:text-[60px] leading-[1.02] tracking-tight max-w-[820px]">
                        Catálogo de artículos publicitarios.
                    </h1>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="bg-yp-paper border-b border-yp-line">
                <nav className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-yp-muted">
                    <Link to="/" className="hover:text-yp-deep transition">INICIO</Link>
                    <span>›</span>
                    <span className="text-yp-deep">CATÁLOGO</span>
                </nav>
            </div>

            {/* Grid */}
            <section className="bg-yp-paper py-16 lg:py-20">
                <div className="max-w-[1400px] mx-auto px-6">
                    {isLoading && <LoadingInformation />}
                    {isError && (
                        <LoadingError error={error instanceof Error ? error.message : String(error)} />
                    )}
                    <InventoryList
                        inventories={inventories || []}
                        classname="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7"
                    />
                </div>
            </section>

            {/* CTA */}
            <section className="bg-yp-deep text-white py-16 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-6 relative grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-accent mb-3">
                            <span className="size-1.5 rounded-full bg-accent" /> ¿NO ENCUENTRAS LO QUE BUSCAS?
                        </div>
                        <h2 className="font-display font-black text-[32px] lg:text-[44px] leading-[1.05] tracking-tight">
                            Hacemos cualquier producto a medida.
                        </h2>
                        <p className="mt-3 text-white/70 text-[15px] max-w-[640px]">
                            Cuéntanos qué necesitas y te asesoramos en material, técnica de impresión y volumen.
                        </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
                        <a
                            href={CONTACT_INFO.WHATSAPP_HREF}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-yp-deep font-bold text-[13px] px-5 py-3 rounded-full hover:brightness-95 transition"
                        >
                            <Icon name="whatsapp" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                            COTIZAR POR WHATSAPP
                        </a>
                        <Link
                            to="/contactanos"
                            className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white/90 hover:text-white text-[13px] px-5 py-3 rounded-full transition"
                        >
                            Contáctanos
                            <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Inventories;
