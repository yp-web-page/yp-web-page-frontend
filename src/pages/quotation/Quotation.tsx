import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import useGetAllQuotations from '../../hooks/useGetQuotations';
import useDeleteQuotation from '../../hooks/useDeleteQuotation';
import useSendEmailQuotation from '../../hooks/useSendEmailQuotation';
import useGenerateQuotationPdf from '../../hooks/useGeneratePdfQuotation';
import { CurrencyUtils } from '../../util/currencyUtils';
import { UserUtils } from '../../util/userUtils';
import { useModal } from '../../context/ModalContext';
import { GetQuotation } from '../../types/Quotation';
import Icon from '../../components/icon/Icon';
import Button from '../../components/Button';

type FilterId = 'ALL' | 'CREATED' | 'COMPLETED';

const formatDate = (d?: Date | string): string => {
    if (!d) return '—';
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
};

const sumProducts = (q: GetQuotation): number =>
    q.addProductToQuotations.reduce((s, p) => s + (p.subtotal || 0), 0);

const sumQuantity = (q: GetQuotation): number =>
    q.addProductToQuotations.reduce((s, p) => s + (p.quantity || 0), 0);

const distinctProducts = (q: GetQuotation): number =>
    new Set(q.addProductToQuotations.map((p) => p.productName)).size;

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    if (status === 'COMPLETED') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-700 text-[10px] tracking-[0.15em] uppercase">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Finalizada
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-accent/40 bg-accent/10 text-yellow-800 text-[10px] tracking-[0.15em] uppercase">
            <span className="size-1.5 rounded-full bg-accent" />
            En curso
        </span>
    );
};

const Quotation: React.FC = () => {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const username = UserUtils.getUsernameFromLocalStorage();

    useEffect(() => {
        if (!username) {
            openModal('notification', 'El usuario no se encuentra logeado, por lo tanto no puede cotizar.', 'error');
            const t = setTimeout(() => {
                closeModal();
                navigate('/');
            }, 5000);
            return () => clearTimeout(t);
        }
    }, [username, navigate, openModal, closeModal]);

    const { data, isLoading } = useGetAllQuotations(username || '');
    const quotations = useMemo<GetQuotation[]>(() => data?.quotations || [], [data]);

    const { mutate: deleteQuotation } = useDeleteQuotation({ username: username || '' });
    const { mutate: sendEmailQuotation } = useSendEmailQuotation({ username: username || '' });
    const { mutate: downloadPdf, isPending: isDownloading } = useGenerateQuotationPdf();

    const [filter, setFilter] = useState<FilterId>('ALL');
    const [search, setSearch] = useState('');
    const [openId, setOpenId] = useState<string | null>(null);

    useEffect(() => {
        const firstActive = quotations.find((q) => (q.status || (q.endQuotation ? 'COMPLETED' : 'CREATED')) === 'CREATED');
        if (firstActive && openId === null) setOpenId(firstActive.quotationId);
    }, [quotations, openId]);

    const stats = useMemo(() => {
        const totalValue = quotations.reduce((s, q) => s + sumProducts(q), 0);
        const active = quotations.filter((q) => (q.status || (q.endQuotation ? 'COMPLETED' : 'CREATED')) === 'CREATED').length;
        return {
            total: quotations.length,
            active,
            completed: quotations.length - active,
            totalValue,
        };
    }, [quotations]);

    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase();
        return quotations.filter((q) => {
            const st = q.status || (q.endQuotation ? 'COMPLETED' : 'CREATED');
            if (filter !== 'ALL' && st !== filter) return false;
            if (s && !q.quotationId.toLowerCase().includes(s)) return false;
            return true;
        });
    }, [quotations, filter, search]);

    if (!username) {
        // Render nothing while the redirect timer is running; the notification modal is already open
        return null;
    }

    return (
        <>
            <Helmet>
                <title>Mis Cotizaciones | Yanca Publicidad</title>
            </Helmet>

            <main className="bg-yp-paper min-h-screen">
                {/* Hero */}
                <section className="relative yp-gradient-radial text-white overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
                    <div className="relative max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
                        <nav className="text-[11px] tracking-[0.3em] text-accent mb-3 uppercase">
                            <Link to="/" className="hover:text-white transition">
                                INICIO
                            </Link>
                            <span className="mx-2">·</span>
                            <span className="text-white">MIS COTIZACIONES</span>
                        </nav>
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <h1 className="font-display font-black text-[44px] sm:text-[60px] leading-[0.95] tracking-tight">
                                    Mis cotizaciones.
                                </h1>
                                <p className="mt-3 text-white/70 max-w-[520px] text-[14px]">
                                    Gestiona tus solicitudes activas, descarga las finalizadas como PDF y repite pedidos.
                                </p>
                            </div>
                            <Link
                                to="/inventarios"
                                className="inline-flex items-center gap-2.5 bg-accent text-yp-deep text-[11px] tracking-[0.2em] uppercase font-bold px-5 py-3 rounded-full hover:bg-white transition"
                            >
                                <Icon name="plus" className="h-3.5 w-3.5" /> Nueva cotización
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <StatCard label="Total" value={stats.total.toString()} tone="white" />
                            <StatCard label="En curso" value={stats.active.toString()} tone="accent" />
                            <StatCard label="Finalizadas" value={stats.completed.toString()} tone="white" />
                            <StatCard
                                label="Valor total"
                                value={CurrencyUtils.convertNumberToCurrency(stats.totalValue)}
                                tone="accent"
                                small
                            />
                        </div>
                    </div>
                </section>

                {/* Filters + List */}
                <section className="max-w-[1200px] mx-auto px-6 py-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center bg-white border border-yp-line rounded-full p-1">
                            {(
                                [
                                    ['ALL', 'Todas', stats.total],
                                    ['CREATED', 'En curso', stats.active],
                                    ['COMPLETED', 'Finalizadas', stats.completed],
                                ] as const
                            ).map(([id, label, count]) => {
                                const active = filter === id;
                                return (
                                    <Button
                                        key={id}
                                        type="button"
                                        onClick={() => setFilter(id)}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10.5px] tracking-[0.2em] uppercase transition ${
                                            active ? 'bg-yp-deep text-accent' : 'text-yp-muted hover:text-yp-deep'
                                        }`}
                                    >
                                        {label}
                                        <span
                                            className={`text-[9.5px] px-1.5 py-0.5 rounded-full ${
                                                active ? 'bg-accent text-yp-deep' : 'bg-yp-paper text-yp-muted'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </Button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-2 bg-white border border-yp-line rounded-full px-4 py-2 w-full sm:w-[300px]">
                            <Icon name="search" className="h-3.5 w-3.5 text-yp-muted" fill="none" stroke="currentColor" />
                            <input
                                type="text"
                                placeholder="Buscar ID de cotización…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 bg-transparent focus:outline-none text-[13px] placeholder:text-yp-muted"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-yp-muted">Cargando cotizaciones…</div>
                    ) : filtered.length === 0 ? (
                        <div className="bg-white border border-yp-line rounded-2xl p-12 text-center card-shadow">
                            <div className="size-16 mx-auto rounded-2xl bg-yp-paper grid place-items-center text-yp-muted mb-4">
                                <Icon name="fileText" className="h-7 w-7" />
                            </div>
                            <div className="font-display font-bold text-[20px] text-yp-deep mb-1.5">
                                No hay cotizaciones
                            </div>
                            <div className="text-[13.5px] text-yp-muted max-w-[400px] mx-auto mb-5">
                                {quotations.length === 0
                                    ? 'Aún no tienes cotizaciones. Crea una desde el catálogo.'
                                    : 'No encontramos cotizaciones con los filtros activos. Limpia los filtros o crea una nueva.'}
                            </div>
                            <Link
                                to="/inventarios"
                                className="inline-flex items-center gap-2 bg-yp-deep text-accent text-[10.5px] tracking-[0.2em] uppercase px-5 py-3 rounded-full hover:bg-yp-mid transition"
                            >
                                <Icon name="plus" className="h-3.5 w-3.5" /> Nueva cotización
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map((q) => (
                                <QuotationCard
                                    key={q.quotationId}
                                    quotation={q}
                                    open={openId === q.quotationId}
                                    onToggle={() => setOpenId(openId === q.quotationId ? null : q.quotationId)}
                                    onDelete={() => deleteQuotation(q.quotationId)}
                                    onSend={() => sendEmailQuotation({ quotationId: q.quotationId })}
                                    onDownload={() => downloadPdf(q.quotationId)}
                                    isDownloading={isDownloading}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

const StatCard: React.FC<{ label: string; value: string; tone: 'white' | 'accent'; small?: boolean }> = ({
    label, value, tone, small,
}) => (
    <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
        <div className="text-[9.5px] tracking-[0.25em] uppercase text-white/55 mb-1.5">{label}</div>
        <div
            className={`font-display font-black tracking-tight ${
                tone === 'accent' ? 'text-accent' : 'text-white'
            } ${small ? 'text-[18px]' : 'text-[30px] leading-none'}`}
        >
            {value}
        </div>
    </div>
);

const QuotationCard: React.FC<{
    quotation: GetQuotation;
    open: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onSend: () => void;
    onDownload: () => void;
    isDownloading: boolean;
}> = ({ quotation: q, open, onToggle, onDelete, onSend, onDownload, isDownloading }) => {
    const status = q.status || (q.endQuotation ? 'COMPLETED' : 'CREATED');
    const total = sumProducts(q);
    const qty = sumQuantity(q);
    const productCount = distinctProducts(q);

    return (
        <div
            className={`bg-white rounded-2xl border ${
                open ? 'border-yp-deep/20 ring-1 ring-yp-deep/10' : 'border-yp-line'
            } card-shadow overflow-hidden transition`}
        >
            <Button
                type="button"
                onClick={onToggle}
                className="w-full text-left p-5 sm:p-6 flex items-center gap-5 hover:bg-yp-paper transition"
            >
                <span className="size-12 rounded-xl bg-yp-deep text-accent grid place-items-center shrink-0">
                    <Icon name="fileText" className="h-5 w-5" />
                </span>
                <span className="flex-1 min-w-0">
                    <span className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-display font-black text-[18px] text-yp-deep tracking-tight">
                            {q.quotationId}
                        </span>
                        <StatusBadge status={status as string} />
                    </span>
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] tracking-[0.15em] uppercase text-yp-muted">
                        <span>Creada · {formatDate(q.createdQuotation)}</span>
                        {q.endQuotation && <span>Finalizada · {formatDate(q.endQuotation)}</span>}
                        <span>
                            {productCount} producto{productCount !== 1 ? 's' : ''} · {qty} uds
                        </span>
                    </span>
                </span>
                <span className="text-right hidden sm:block">
                    <span className="block text-[9.5px] tracking-[0.2em] uppercase text-yp-muted">Total</span>
                    <span className="block font-display font-black text-[22px] text-yp-deep tracking-tight leading-none mt-0.5">
                        {CurrencyUtils.convertNumberToCurrency(total)}
                    </span>
                </span>
                <span
                    className={`size-9 rounded-full grid place-items-center transition ${
                        open ? 'rotate-180 bg-yp-deep text-accent' : 'bg-yp-paper text-yp-muted'
                    }`}
                >
                    <Icon name="chevronRight" className="h-4 w-4 rotate-90" />
                </span>
            </Button>

            {open && (
                <div className="border-t border-yp-line bg-yp-paper p-5 sm:p-6">
                    <div className="sm:hidden mb-4 flex items-baseline justify-between">
                        <div className="text-[10px] tracking-[0.2em] uppercase text-yp-muted">Total cotización</div>
                        <div className="font-display font-black text-[22px] text-yp-deep tracking-tight">
                            {CurrencyUtils.convertNumberToCurrency(total)}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-yp-line overflow-hidden">
                        <div className="hidden md:grid grid-cols-[2.2fr_1fr_1.4fr_0.9fr_0.9fr_0.9fr_1.1fr] gap-4 px-5 py-3 bg-yp-paper border-b border-yp-line text-[9.5px] tracking-[0.2em] uppercase text-yp-muted">
                            <div>Producto</div>
                            <div>Color</div>
                            <div>Marcación</div>
                            <div>Tamaño</div>
                            <div className="text-right">P. unit</div>
                            <div className="text-right">Cant.</div>
                            <div className="text-right">Subtotal</div>
                        </div>

                        {q.addProductToQuotations.map((p, i) => {
                            const hasPrint = !!p.printName;
                            const unit = p.productPrice + (p.printPrice || 0);
                            return (
                                <div
                                    key={p.id ?? i}
                                    className={`md:grid md:grid-cols-[2.2fr_1fr_1.4fr_0.9fr_0.9fr_0.9fr_1.1fr] gap-4 px-5 py-4 ${
                                        i !== q.addProductToQuotations.length - 1 ? 'border-b border-yp-line' : ''
                                    }`}
                                >
                                    {/* Mobile compact */}
                                    <div className="md:hidden mb-2">
                                        <div className="font-display font-bold text-[15px] text-yp-deep">{p.productName}</div>
                                        <div className="text-[10px] tracking-[0.15em] uppercase text-yp-muted mt-0.5">
                                            {p.colorName} · {hasPrint ? p.printName : 'Sin marca'}
                                        </div>
                                        <div className="flex items-baseline justify-between mt-2">
                                            <span className="text-[11px] text-yp-muted">
                                                {p.quantity} uds × {CurrencyUtils.convertNumberToCurrency(unit)}
                                            </span>
                                            <span className="font-display font-bold text-[16px] text-yp-deep">
                                                {CurrencyUtils.convertNumberToCurrency(p.subtotal)}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Desktop */}
                                    <div className="hidden md:block font-display font-bold text-[13.5px] text-yp-deep">
                                        {p.productName}
                                    </div>
                                    <div className="hidden md:block text-[13px] text-yp-ink">{p.colorName}</div>
                                    <div className="hidden md:block text-[13px] text-yp-ink">
                                        {hasPrint ? p.printName : <span className="text-yp-muted">No aplica</span>}
                                    </div>
                                    <div className="hidden md:block text-[11.5px] text-yp-ink">
                                        {hasPrint && p.isPrintPersonalizable && (p.width ?? 0) > 0 ? (
                                            `${p.width}×${p.height} cm`
                                        ) : (
                                            <span className="text-yp-muted">—</span>
                                        )}
                                    </div>
                                    <div className="hidden md:block text-[12px] text-yp-ink text-right">
                                        {CurrencyUtils.convertNumberToCurrency(unit)}
                                    </div>
                                    <div className="hidden md:block text-[12px] text-yp-ink text-right">{p.quantity}</div>
                                    <div className="hidden md:block font-display font-bold text-[13.5px] text-yp-deep text-right">
                                        {CurrencyUtils.convertNumberToCurrency(p.subtotal)}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="bg-yp-deep text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="text-[9.5px] tracking-[0.2em] uppercase text-white/60 mb-0.5">
                                    Total cotización
                                </div>
                                <div className="font-display font-black text-[26px] text-accent tracking-tight leading-none">
                                    {CurrencyUtils.convertNumberToCurrency(total)}
                                </div>
                            </div>
                            <div className="text-[9.5px] tracking-[0.15em] uppercase text-white/50">
                                Sin envío incluido
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                        {status === 'CREATED' && (
                            <>
                                <Button
                                    type="button"
                                    onClick={onSend}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yp-deep text-accent text-[10.5px] tracking-[0.2em] uppercase hover:bg-yp-mid transition"
                                >
                                    <Icon name="mail" className="h-3.5 w-3.5" fill="currentColor" /> Enviar cotización
                                </Button>
                                <Link
                                    to="/inventarios"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-yp-line text-yp-ink text-[10.5px] tracking-[0.2em] uppercase hover:bg-yp-line/30 transition"
                                >
                                    <Icon name="plus" className="h-3.5 w-3.5" /> Agregar productos
                                </Link>
                                <Button
                                    type="button"
                                    onClick={onDelete}
                                    className="ml-auto inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-red-100 text-red-500 text-[10.5px] tracking-[0.2em] uppercase hover:bg-red-50 transition"
                                >
                                    <Icon name="close" className="h-3.5 w-3.5" /> Cancelar
                                </Button>
                            </>
                        )}
                        {status === 'COMPLETED' && (
                            <Button
                                type="button"
                                onClick={onDownload}
                                disabled={isDownloading}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yp-deep text-accent text-[10.5px] tracking-[0.2em] uppercase hover:bg-yp-mid disabled:opacity-60 transition"
                            >
                                <Icon name="file" className="h-3.5 w-3.5" />{' '}
                                {isDownloading ? 'Generando PDF…' : 'Descargar PDF'}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quotation;
