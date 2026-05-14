import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useGetInventoryView } from '../../hooks/useGetInventoryView';
import { useGetListView } from '../../hooks/useGetListView';
import Icon from '../../components/icon/Icon';
import Button from '../../components/Button';
import { CONTACT_INFO } from '../../constants/social_networks';
import type { Color, ProductCard as ProductCardType } from '../../types/ProductTypes';

type PriceRange = { id: string; label: string; min: number; max: number };

const PRICE_RANGES: PriceRange[] = [
    { id: 'lt20', label: 'Hasta $20.000', min: 0, max: 20000 },
    { id: '20-50', label: '$20.000 — $50.000', min: 20000, max: 50000 },
    { id: '50-100', label: '$50.000 — $100.000', min: 50000, max: 100000 },
    { id: 'gt100', label: 'Más de $100.000', min: 100000, max: Number.POSITIVE_INFINITY },
];

function parsePrice(raw: string | number | null | undefined): number {
    if (raw == null) return 0;
    if (typeof raw === 'number') return raw;
    const digits = raw.replace(/[^0-9]/g, '');
    return digits ? Number(digits) : 0;
}

function colorKey(c: Color): string {
    return c.hexCode.toLowerCase();
}

const Inventory: React.FC = () => {
    const { inventoryId } = useParams<{ inventoryId: string }>();
    const location = useLocation();
    const initialListId = (location.state as { listId?: string } | null)?.listId || '';

    const [selectedListId, setSelectedListId] = useState<string>(initialListId);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [activePriceId, setActivePriceId] = useState<string | null>(null);
    const [activeColors, setActiveColors] = useState<string[]>([]);

    useEffect(() => {
        setActivePriceId(null);
        setActiveColors([]);
        setCurrentPage(0);
    }, [selectedListId]);

    const { data: inventoryView, isLoading: isLoadingInv } = useGetInventoryView(inventoryId || '');
    const { data: listView, isLoading: isLoadingList } = useGetListView(selectedListId, currentPage, pageSize);

    const loadedProducts: ProductCardType[] = listView?.products?.content || [];

    const availableColors = useMemo(() => {
        const map = new Map<string, Color>();
        loadedProducts.forEach((p) => p.colors?.forEach((c) => map.set(colorKey(c), c)));
        return Array.from(map.values());
    }, [loadedProducts]);

    const filteredProducts = useMemo(() => {
        const range = activePriceId ? PRICE_RANGES.find((r) => r.id === activePriceId) : null;
        return loadedProducts.filter((p) => {
            if (range) {
                const price = parsePrice(p.price);
                if (price < range.min || price > range.max) return false;
            }
            if (activeColors.length) {
                const productHexes = (p.colors || []).map(colorKey);
                if (!activeColors.some((h) => productHexes.includes(h))) return false;
            }
            return true;
        });
    }, [loadedProducts, activePriceId, activeColors]);

    const toggleColor = (hex: string) =>
        setActiveColors((prev) => (prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]));

    const clearAll = () => {
        setActivePriceId(null);
        setActiveColors([]);
    };

    const hasActiveFilters = activePriceId !== null || activeColors.length > 0;
    const activeRangeLabel = activePriceId ? PRICE_RANGES.find((r) => r.id === activePriceId)?.label : null;
    const activeListName = inventoryView?.lists?.find((l) => l.id === selectedListId)?.name;

    return (
        <>
            {/* Hero */}
            <section className="relative yp-gradient-radial text-white overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
                <div className="max-w-[1400px] mx-auto px-6 pt-14 pb-12 relative">
                    <h1 className="font-display font-black text-[36px] lg:text-[52px] leading-[1.02] tracking-tight">
                        {inventoryView?.title || (isLoadingInv ? 'Cargando…' : 'Inventario')}
                    </h1>
                    <p className="mt-3 text-white/65 text-[14px] lg:text-[15px] max-w-[640px]">
                        Selecciona una subcategoría y filtra por precio o color para encontrar lo que buscas.
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="bg-yp-paper border-b border-yp-line">
                <nav className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-yp-muted">
                    <Link to="/" className="hover:text-yp-deep transition">INICIO</Link>
                    <span>›</span>
                    <Link to="/inventarios" className="hover:text-yp-deep transition">CATÁLOGO</Link>
                    <span>›</span>
                    <span className="text-yp-deep truncate">{inventoryView?.title || 'INVENTARIO'}</span>
                </nav>
            </div>

            {/* Main */}
            <section className="bg-yp-paper py-12 lg:py-16">
                <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="lg:sticky lg:top-28 bg-white rounded-2xl card-shadow border border-yp-line p-5">
                            <Link
                                to="/inventarios"
                                className="inline-flex items-center gap-1 text-[12px] font-mono tracking-[0.18em] text-yp-muted hover:text-yp-deep transition mb-5"
                            >
                                ← VOLVER AL CATÁLOGO
                            </Link>

                            <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3">
                                SUBCATEGORÍAS
                            </div>
                            <div className="grid gap-1 mb-6">
                                {inventoryView?.lists?.map((list) => {
                                    const active = list.id === selectedListId;
                                    return (
                                        <Button
                                            key={list.id}
                                            type="button"
                                            onClick={() => setSelectedListId(list.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] flex items-center justify-between transition ${
                                                active
                                                    ? 'bg-yp-deep text-white font-semibold'
                                                    : 'text-yp-ink hover:bg-yp-paper'
                                            }`}
                                        >
                                            <span className="truncate">{list.name}</span>
                                            {active && <span className="text-accent">●</span>}
                                        </Button>
                                    );
                                })}
                                {!inventoryView?.lists?.length && !isLoadingInv && (
                                    <p className="text-[12px] text-yp-muted">No hay subcategorías disponibles.</p>
                                )}
                            </div>

                            {/* Price filter */}
                            <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3 flex items-center justify-between">
                                <span>PRECIO</span>
                                {activePriceId && (
                                    <Button
                                        type="button"
                                        onClick={() => setActivePriceId(null)}
                                        className="text-yp-muted hover:text-yp-deep normal-case tracking-normal text-[10px]"
                                    >
                                        limpiar
                                    </Button>
                                )}
                            </div>
                            <div className="grid gap-1.5 mb-6">
                                {PRICE_RANGES.map((r) => {
                                    const active = r.id === activePriceId;
                                    return (
                                        <Button
                                            key={r.id}
                                            type="button"
                                            onClick={() => setActivePriceId(active ? null : r.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] flex items-center gap-2 transition ${
                                                active
                                                    ? 'bg-accent text-yp-deep font-semibold'
                                                    : 'text-yp-ink hover:bg-yp-paper'
                                            }`}
                                        >
                                            <span
                                                className={`size-3.5 rounded border flex items-center justify-center ${
                                                    active ? 'border-yp-deep bg-yp-deep' : 'border-yp-line'
                                                }`}
                                            >
                                                {active && <Icon name="check" className="h-2.5 w-2.5 text-accent" />}
                                            </span>
                                            {r.label}
                                        </Button>
                                    );
                                })}
                            </div>

                            {/* Color filter */}
                            <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-3 flex items-center justify-between">
                                <span>COLOR{activeColors.length > 0 && ` · ${activeColors.length}`}</span>
                                {activeColors.length > 0 && (
                                    <Button
                                        type="button"
                                        onClick={() => setActiveColors([])}
                                        className="text-yp-muted hover:text-yp-deep normal-case tracking-normal text-[10px]"
                                    >
                                        limpiar
                                    </Button>
                                )}
                            </div>
                            {availableColors.length > 0 ? (
                                <div className="grid grid-cols-7 gap-2">
                                    {availableColors.map((c) => {
                                        const k = colorKey(c);
                                        const active = activeColors.includes(k);
                                        return (
                                            <button
                                                key={k}
                                                type="button"
                                                onClick={() => toggleColor(k)}
                                                aria-label={c.name}
                                                title={c.name}
                                                className={`size-7 rounded-full border transition relative ${
                                                    active ? 'ring-2 ring-yp-deep border-white' : 'border-yp-line hover:scale-110'
                                                }`}
                                                style={{ backgroundColor: c.hexCode }}
                                            >
                                                {active && (
                                                    <span className="absolute inset-0 grid place-items-center text-white text-[10px] drop-shadow">
                                                        ✓
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-[12px] text-yp-muted">Selecciona una subcategoría para filtrar.</p>
                            )}
                        </div>
                    </aside>

                    {/* Products */}
                    <main className="lg:col-span-9">
                        {/* Header + active chips */}
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                            <div>
                                <div className="font-mono text-[10.5px] tracking-[0.25em] text-yp-bright mb-1">
                                    {activeListName ? 'SUBCATEGORÍA' : 'INVENTARIO'}
                                </div>
                                <h2 className="font-display font-black text-[28px] lg:text-[36px] text-yp-deep leading-tight">
                                    {activeListName || inventoryView?.title || 'Productos'}
                                </h2>
                                {selectedListId && listView && (
                                    <p className="mt-1 text-[13px] text-yp-muted">
                                        {filteredProducts.length} de {listView.products?.totalElements ?? loadedProducts.length} productos
                                    </p>
                                )}
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                {activeRangeLabel && (
                                    <Button
                                        type="button"
                                        onClick={() => setActivePriceId(null)}
                                        className="inline-flex items-center gap-1.5 bg-yp-deep text-white text-[12px] font-mono tracking-[0.1em] px-3 py-1.5 rounded-full hover:bg-yp-mid transition"
                                    >
                                        {activeRangeLabel} <span className="text-accent">×</span>
                                    </Button>
                                )}
                                {activeColors.map((hex) => {
                                    const c = availableColors.find((cc) => colorKey(cc) === hex);
                                    return (
                                        <Button
                                            key={hex}
                                            type="button"
                                            onClick={() => toggleColor(hex)}
                                            className="inline-flex items-center gap-1.5 bg-white border border-yp-line text-yp-ink text-[12px] px-3 py-1.5 rounded-full hover:border-yp-deep transition"
                                        >
                                            <span className="size-3 rounded-full border border-yp-line" style={{ backgroundColor: hex }} />
                                            {c?.name || hex} <span className="text-yp-muted">×</span>
                                        </Button>
                                    );
                                })}
                                <Button
                                    type="button"
                                    onClick={clearAll}
                                    className="text-[12px] text-yp-muted hover:text-yp-deep underline ml-2"
                                >
                                    Limpiar todo
                                </Button>
                            </div>
                        )}

                        {/* Empty / loading / grid */}
                        {!selectedListId ? (
                            <div className="bg-white rounded-2xl border border-yp-line p-10 text-center card-shadow">
                                <div className="font-display font-bold text-[22px] text-yp-deep mb-2">
                                    Selecciona una subcategoría
                                </div>
                                <p className="text-[14px] text-yp-muted max-w-[420px] mx-auto">
                                    Elige una subcategoría del sidebar para ver los productos disponibles.
                                </p>
                            </div>
                        ) : isLoadingList ? (
                            <div className="text-yp-muted">Cargando productos…</div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-yp-line p-10 text-center card-shadow">
                                <div className="font-display font-bold text-[22px] text-yp-deep mb-2">
                                    Sin resultados
                                </div>
                                <p className="text-[14px] text-yp-muted mb-5 max-w-[420px] mx-auto">
                                    Ningún producto coincide con los filtros aplicados.
                                </p>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    <Button
                                        type="button"
                                        onClick={clearAll}
                                        className="inline-flex items-center gap-2 bg-yp-deep text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-yp-mid transition"
                                    >
                                        Limpiar filtros
                                    </Button>
                                    <a
                                        href={CONTACT_INFO.WHATSAPP_HREF}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-accent text-yp-deep text-[13px] font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition"
                                    >
                                        <Icon name="whatsapp" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                        Cotizar a medida
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {filteredProducts.map((p) => (
                                        <ProductMiniCard key={p.id} product={p} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {listView?.products && (
                                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 text-[12px] text-yp-muted">
                                            <span>
                                                Mostrando {listView.products.numberOfElements} de {listView.products.totalElements}
                                            </span>
                                            <select
                                                value={pageSize}
                                                onChange={(e) => {
                                                    setPageSize(Number(e.target.value));
                                                    setCurrentPage(0);
                                                }}
                                                className="border border-yp-line rounded-full px-3 py-1 text-[12px] bg-white text-yp-ink focus:outline-none focus:border-yp-bright"
                                            >
                                                <option value="6">6 por página</option>
                                                <option value="12">12 por página</option>
                                                <option value="24">24 por página</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                                                disabled={listView.products.first}
                                                className="px-4 py-2 rounded-full border border-yp-line text-[12px] text-yp-ink hover:border-yp-deep disabled:opacity-40 disabled:hover:border-yp-line transition"
                                            >
                                                Anterior
                                            </Button>
                                            <span className="text-[12px] text-yp-muted px-2">
                                                {listView.products.pageable.pageNumber + 1} / {listView.products.totalPages}
                                            </span>
                                            <Button
                                                type="button"
                                                onClick={() => setCurrentPage((p) => p + 1)}
                                                disabled={listView.products.last}
                                                className="px-4 py-2 rounded-full bg-yp-deep text-white text-[12px] hover:bg-yp-mid disabled:opacity-40 disabled:hover:bg-yp-deep transition"
                                            >
                                                Siguiente
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </section>
        </>
    );
};

const ProductMiniCard: React.FC<{ product: ProductCardType }> = ({ product }) => (
    <Link
        to={`/producto/${product.id}`}
        className="group bg-white rounded-2xl border border-yp-line card-shadow hover-lift overflow-hidden block"
    >
        <div className="relative aspect-square overflow-hidden bg-yp-paper">
            {product.imageUrl ? (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-[0.25em] text-yp-deep/40">
                    SIN IMAGEN
                </div>
            )}
        </div>
        <div className="p-4">
            <h3 className="font-display font-bold text-[15px] text-yp-deep leading-tight line-clamp-2">{product.name}</h3>
            <div className="mt-2 flex items-center justify-between">
                <div className="font-display font-extrabold text-[16px] text-yp-deep">{product.price || '—'}</div>
                {product.colors?.length > 0 && (
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                            {product.colors.slice(0, 4).map((c) => (
                                <div
                                    key={c.hexCode}
                                    className="size-4 rounded-full ring-2 ring-white border border-yp-line"
                                    style={{ backgroundColor: c.hexCode }}
                                />
                            ))}
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.18em] text-yp-muted uppercase">
                            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colores'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    </Link>
);

export default Inventory;
