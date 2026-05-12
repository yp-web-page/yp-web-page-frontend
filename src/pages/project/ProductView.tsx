import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductById } from '../../hooks/useGetProductById';
import Button from '../../components/Button';
import Icon from '../../components/icon/Icon';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { CONTACT_INFO } from '../../constants/social_networks';
import type { Color } from '../../types/ProductTypes';

type TabId = 'desc' | 'specs' | 'ship';

const TABS: { id: TabId; label: string }[] = [
    { id: 'desc', label: 'Descripción' },
    { id: 'specs', label: 'Especificaciones' },
    { id: 'ship', label: 'Envíos y entrega' },
];

const ProductView: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data: product, isLoading, error } = useGetProductById(productId ?? '');
    const { isAuthenticated } = useAuth();
    const { openModal } = useModal();

    const [qty, setQty] = useState(1);
    const [selectedColorIdx, setSelectedColorIdx] = useState(0);
    const [tab, setTab] = useState<TabId>('desc');

    if (!productId) return <div className="p-10">Product ID not found</div>;
    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="p-10">Error: {error.message}</div>;
    if (!product) return <div className="p-10">No product found</div>;

    const handleQuote = () => {
        if (isAuthenticated) openModal('quotation', undefined, undefined, product);
        else openModal('login');
    };

    const colors: Color[] = product.colors || [];
    const selectedColor = colors[selectedColorIdx];

    return (
        <main className="bg-yp-paper">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-yp-line">
                <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-yp-muted">
                    <Link to="/" className="hover:text-yp-bright transition">INICIO</Link>
                    <Icon name="chevronRight" className="h-3 w-3" />
                    <Link to="/inventarios" className="hover:text-yp-bright transition">PRODUCTOS</Link>
                    <Icon name="chevronRight" className="h-3 w-3" />
                    <span className="text-yp-deep truncate uppercase">{product.name}</span>
                </div>
            </div>

            <section className="max-w-[1400px] mx-auto px-6 py-10 lg:py-14">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Gallery */}
                    <div className="lg:col-span-6">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white card-shadow border border-yp-line">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-contain p-8"
                                />
                            ) : (
                                <div className="absolute inset-0 grid place-items-center font-mono text-[12px] tracking-[0.25em] text-yp-deep/40">
                                    SIN IMAGEN
                                </div>
                            )}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="bg-accent text-yp-deep font-mono text-[10px] tracking-[0.18em] px-2.5 py-1 rounded-full font-bold">
                                    ENTREGA 24H
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button
                                    type="button"
                                    aria-label="Favorito"
                                    className="size-10 rounded-full bg-white/95 grid place-items-center hover:bg-white border border-yp-line text-yp-muted hover:text-yp-deep transition"
                                >
                                    <Icon name="heart" className="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Compartir"
                                    className="size-10 rounded-full bg-white/95 grid place-items-center hover:bg-white border border-yp-line text-yp-muted hover:text-yp-deep transition"
                                >
                                    <Icon name="share" className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-6">
                        <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] text-yp-bright">
                            <span className="size-1.5 rounded-full bg-yp-bright" /> PRODUCTO
                            <span className="text-yp-line">·</span>
                            <span className="text-yp-muted">SKU {productId.slice(0, 8).toUpperCase()}</span>
                        </div>

                        <h1 className="font-display font-black text-[34px] lg:text-[44px] leading-[1.04] text-yp-deep mt-3 tracking-tight">
                            {product.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4">
                            <span className="inline-flex items-center gap-1.5 text-[13px] text-emerald-600 font-semibold">
                                <span className="size-1.5 rounded-full bg-emerald-500" /> En stock
                            </span>
                            {product.isPrintPersonalizable && (
                                <span className="inline-flex items-center gap-1.5 text-[13px] text-yp-muted">
                                    <span className="size-1.5 rounded-full bg-accent" /> Personalizable
                                </span>
                            )}
                        </div>

                        {product.description && (
                            <p className="mt-5 text-[15px] leading-relaxed text-yp-ink max-w-[560px]">{product.description}</p>
                        )}

                        {/* Specs */}
                        <div className="mt-7 rounded-2xl bg-white border border-yp-line px-5 lg:px-6 py-1">
                            <SpecRow label="MATERIAL" value={product.material} />
                            <SpecRow label="MEDIDAS" value={product.size ? `${product.size} cm` : '—'} />
                            <SpecRow label="ÁREA DE IMPRESIÓN APROX." value={product.printingArea} />
                            <SpecRow label="MARCA" value={product.printingMethods?.[0]?.name || 'No especificado'} />
                            <SpecRow label="EMPAQUE" value={product.boxContent} last />
                        </div>

                        {/* Price */}
                        {product.price && (
                            <div className="mt-7">
                                <div className="font-mono text-[10px] tracking-[0.25em] text-yp-muted mb-1">PRECIO UNITARIO</div>
                                <div className="font-display font-black text-[30px] lg:text-[34px] leading-none text-yp-deep tracking-tight">
                                    {product.price}
                                </div>
                                <div className="text-[12.5px] text-yp-muted mt-1">Descuentos por volumen al cotizar.</div>
                            </div>
                        )}

                        {/* Colors */}
                        {colors.length > 0 && (
                            <div className="mt-7">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="font-mono text-[10px] tracking-[0.25em] text-yp-muted">
                                        COLOR ·{' '}
                                        <span className="text-yp-deep font-semibold normal-case tracking-normal">
                                            {selectedColor?.name || 'selecciona'}
                                        </span>
                                    </div>
                                    <div className="font-mono text-[10px] tracking-[0.2em] text-yp-muted">
                                        {colors.length} OPCIONES
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {colors.map((c, i) => {
                                        const active = i === selectedColorIdx;
                                        return (
                                            <button
                                                key={c.hexCode + i}
                                                type="button"
                                                onClick={() => setSelectedColorIdx(i)}
                                                aria-label={c.name}
                                                title={c.name}
                                                className={`relative size-11 rounded-full grid place-items-center transition ${
                                                    active
                                                        ? 'ring-2 ring-yp-deep ring-offset-2'
                                                        : 'ring-1 ring-yp-line hover:ring-yp-bright'
                                                }`}
                                            >
                                                <span
                                                    className="size-8 rounded-full border border-yp-line/50"
                                                    style={{ backgroundColor: c.hexCode }}
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Qty + CTAs */}
                        <div className="mt-7 flex flex-wrap gap-3 items-center">
                            <div className="inline-flex items-center bg-white border border-yp-line rounded-full p-1">
                                <Button
                                    type="button"
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="size-10 grid place-items-center rounded-full hover:bg-yp-paper text-yp-deep"
                                    aria-label="Restar"
                                >
                                    <Icon name="minus" className="h-3.5 w-3.5" />
                                </Button>
                                <input
                                    value={qty}
                                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || '1', 10)))}
                                    className="w-12 text-center bg-transparent outline-none font-display font-bold text-[15px] text-yp-deep"
                                />
                                <Button
                                    type="button"
                                    onClick={() => setQty((q) => q + 1)}
                                    className="size-10 grid place-items-center rounded-full hover:bg-yp-paper text-yp-deep"
                                    aria-label="Sumar"
                                >
                                    <Icon name="plus" className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                            <Button
                                type="button"
                                onClick={handleQuote}
                                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 bg-yp-deep hover:bg-yp-mid transition text-white font-bold text-[13.5px] tracking-wide px-6 py-4 rounded-full"
                            >
                                <Icon name="cart" className="h-4 w-4" /> AÑADIR A COTIZACIÓN
                            </Button>
                            <a
                                href={CONTACT_INFO.WHATSAPP_HREF}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-accent hover:brightness-95 transition text-yp-deep font-bold text-[13.5px] tracking-wide px-6 py-4 rounded-full"
                            >
                                <Icon name="whatsapp" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-16 lg:mt-20">
                    <div className="flex items-center gap-1 border-b border-yp-line">
                        {TABS.map((t) => (
                            <Button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`relative px-5 py-3.5 text-[13.5px] font-semibold transition ${
                                    tab === t.id ? 'text-yp-deep' : 'text-yp-muted hover:text-yp-deep'
                                }`}
                            >
                                {t.label}
                                {tab === t.id && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-yp-deep" />}
                            </Button>
                        ))}
                    </div>
                    <div className="bg-white rounded-2xl border border-yp-line mt-4 p-6 lg:p-8 text-[14.5px] leading-relaxed text-yp-ink max-w-[920px]">
                        {tab === 'desc' && (
                            <p>{product.description || 'Sin descripción disponible.'}</p>
                        )}
                        {tab === 'specs' && (
                            <ul className="space-y-2 list-disc pl-5">
                                {product.material && <li><b>Material:</b> {product.material}</li>}
                                {product.size && <li><b>Medidas:</b> {product.size} cm</li>}
                                {product.printingArea && <li><b>Área de impresión:</b> {product.printingArea}</li>}
                                {product.printingMethods?.length > 0 && (
                                    <li>
                                        <b>Métodos de impresión:</b>{' '}
                                        {product.printingMethods.map((m) => m.name).join(', ')}
                                    </li>
                                )}
                                {product.boxContent && <li><b>Empaque:</b> {product.boxContent}</li>}
                            </ul>
                        )}
                        {tab === 'ship' && (
                            <p>
                                Producción 3–5 días hábiles tras aprobación de arte. Envíos a todo el país por Servientrega
                                o Coordinadora. Para pedidos grandes coordina con nosotros por WhatsApp.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

const SpecRow: React.FC<{ label: string; value?: string | null; last?: boolean }> = ({ label, value, last }) => {
    if (!value) return null;
    return (
        <div className={`grid grid-cols-12 gap-4 py-3 ${last ? '' : 'border-b border-yp-line'}`}>
            <div className="col-span-5 lg:col-span-4 font-mono text-[10.5px] tracking-[0.2em] text-yp-muted uppercase pt-0.5">
                {label}
            </div>
            <div className="col-span-7 lg:col-span-8 text-[14px] text-yp-deep">{value}</div>
        </div>
    );
};

export default ProductView;
