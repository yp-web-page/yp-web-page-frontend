import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Color, PrintingProductPrice, Product } from '../../types/ProductTypes';
import { AddProductToQuotation } from '../../types/Quotation';
import useGetProductPrices from '../../hooks/useGetProductPrices';
import useAddProductToQuotation from '../../hooks/useAddProductToQuotation';
import { useModal } from '../../context/ModalContext';
import { TypeNotification } from '../../types/TypeNotifcation';
import { UserUtils } from '../../util/userUtils';
import { QuotationUtils } from '../../util/quotationUtils';
import Icon from '../icon/Icon';
import Button from '../Button';

interface QuotationModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product;
}

const LIGHT_HEXES = new Set(['#ffffff', '#ffd047', '#fff', '#ffd']);
const fmtCOP = (n: number) => '$' + n.toLocaleString('es-CO', { maximumFractionDigits: 0 });

const Stepper: React.FC<{ value: number; onChange: (v: number) => void; min?: number; max?: number }> = ({
    value, onChange, min = 0, max = 99999,
}) => (
    <div className="inline-flex items-center bg-white border border-yp-line rounded-full overflow-hidden">
        <Button
            type="button"
            onClick={() => onChange(Math.max(min, (value || 0) - 1))}
            disabled={value <= min}
            className="size-9 grid place-items-center hover:bg-yp-paper text-yp-ink disabled:opacity-30"
            aria-label="Restar"
        >
            <Icon name="minus" className="h-3.5 w-3.5" />
        </Button>
        <input
            type="number"
            value={value || 0}
            onChange={(e) => onChange(Math.max(min, Math.min(max, parseInt(e.target.value, 10) || 0)))}
            className="w-14 text-center text-[13px] font-bold text-yp-deep focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button
            type="button"
            onClick={() => onChange(Math.min(max, (value || 0) + 1))}
            className="size-9 grid place-items-center hover:bg-yp-paper text-yp-ink"
            aria-label="Sumar"
        >
            <Icon name="plus" className="h-3.5 w-3.5" />
        </Button>
    </div>
);

const QuotationModal: React.FC<QuotationModalProps> = ({ isOpen, onClose, product }) => {
    const username = UserUtils.getUsernameFromLocalStorage();
    const { openModal, closeModal } = useModal();

    const [selectedColors, setSelectedColors] = useState<Color[]>([]);
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [selectedPrintingMethodName, setSelectedPrintingMethodName] = useState<string>('');
    const [heightCm, setHeightCm] = useState<number>(0);
    const [widthCm, setWidthCm] = useState<number>(0);

    const { mutate: fetchPrices, data: pricesResponse, isPending: isPendingPrices, isError } = useGetProductPrices();
    const { mutate: addProductToQuotation } = useAddProductToQuotation({
        onCloseQuotationModal: onClose,
        username: username ?? '',
    });

    const openNotification = useCallback(
        (message: string, type: TypeNotification) => openModal('notification', message, type),
        [openModal],
    );

    const { width: maxW, height: maxH } = useMemo(
        () => QuotationUtils.parsePrintingArea(product?.printingArea),
        [product?.printingArea],
    );

    // Unauth → notification + auto close
    useEffect(() => {
        if (isOpen && !username) {
            openNotification('El usuario no se encuentra logeado, por lo tanto no puede cotizar.', 'error');
            const t = setTimeout(closeModal, 5000);
            return () => clearTimeout(t);
        }
    }, [isOpen, username, openNotification, closeModal]);

    // Reset + fetch prices on open
    useEffect(() => {
        if (!isOpen || !product) return;
        setSelectedColors([]);
        setQuantities({});
        setSelectedPrintingMethodName('');
        setHeightCm(maxH);
        setWidthCm(maxW);
        const printIds = product.printingMethods?.map((pm) => pm.id) || [];
        fetchPrices({ productId: product.id, printIds });
    }, [isOpen, product, fetchPrices, maxW, maxH]);

    // Escape closes
    useEffect(() => {
        if (!isOpen) return;
        const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onEsc);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onEsc);
        };
    }, [isOpen, onClose]);

    const totalQty = useMemo(() => QuotationUtils.getTotalQuantity(quantities), [quantities]);

    const printingPrice = useMemo(() => {
        if (!product || isPendingPrices || !pricesResponse?.priceDtos?.length) return 0;
        const printingPrices: PrintingProductPrice[] = pricesResponse.priceDtos;
        return QuotationUtils.getPrintingPrice({
            printingPrices,
            selectedPrintingMethod: selectedPrintingMethodName,
            isPending: isPendingPrices,
            totalQuantity: totalQty,
            product,
            printingMethods: product.printingMethods,
        });
    }, [product, pricesResponse, selectedPrintingMethodName, isPendingPrices, totalQty]);

    const totalPriceStr = useMemo(() => {
        if (!product) return '0.00';
        return QuotationUtils.calculateTotalPrice({
            productPrice: parseFloat(product.price),
            totalQuantity: totalQty,
            heightCm,
            widthCm,
            printingPrice,
            isPrintPersonalizable: product.isPrintPersonalizable,
        });
    }, [product, totalQty, heightCm, widthCm, printingPrice]);

    const totalPrice = Number(totalPriceStr);
    const unitPrice = product ? parseFloat(product.price) : 0;
    const subtotalProduct = unitPrice * totalQty;
    const subtotalPrinting = totalPrice - subtotalProduct;

    const toggleColor = useCallback((c: Color) => {
        setSelectedColors((prev) => {
            const exists = prev.find((x) => x.name === c.name);
            if (exists) {
                setQuantities((q) => {
                    const next = { ...q };
                    delete next[c.name];
                    return next;
                });
                return prev.filter((x) => x.name !== c.name);
            }
            setQuantities((q) => ({ ...q, [c.name]: q[c.name] || 25 }));
            return [...prev, c];
        });
    }, []);

    const removeColor = useCallback((name: string) => {
        setSelectedColors((prev) => prev.filter((x) => x.name !== name));
        setQuantities((q) => {
            const next = { ...q };
            delete next[name];
            return next;
        });
    }, []);

    const handleCancel = useCallback(() => {
        setSelectedColors([]);
        setQuantities({});
        setSelectedPrintingMethodName('');
        setHeightCm(0);
        setWidthCm(0);
        onClose();
    }, [onClose]);

    const handleAdd = useCallback(() => {
        if (!product || !username) return;
        const addProductToQuotations: AddProductToQuotation[] = selectedColors.map((color) => ({
            id: null,
            username,
            productName: product.name,
            productPrice: parseFloat(product.price),
            colorName: color.name,
            printName: selectedPrintingMethodName,
            printPrice: printingPrice,
            quantity: quantities[color.name] || 0,
            width: !product.printingArea || selectedPrintingMethodName !== '' ? widthCm : 0,
            height: !product.printingArea || selectedPrintingMethodName !== '' ? heightCm : 0,
            subtotal: 0,
            isPrintPersonalizable: product.isPrintPersonalizable,
        }));
        addProductToQuotation({ addProductToQuotations });
    }, [product, username, selectedColors, quantities, selectedPrintingMethodName, printingPrice, widthCm, heightCm, addProductToQuotation]);

    const canSubmit = totalQty > 0 && !isPendingPrices && !isError;

    const content = (
        <AnimatePresence>
            {isOpen && product && username && (
                <div className="fixed inset-0 z-[9999]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-yp-deep/70"
                        style={{ backdropFilter: 'blur(8px)' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ y: 12, scale: 0.96, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 12, scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                            className="relative w-full max-w-[1080px] my-auto bg-white rounded-3xl overflow-hidden"
                            style={{ boxShadow: '0 32px 80px -20px rgba(0,31,54,0.55), 0 12px 30px -10px rgba(0,31,54,0.25)' }}
                        >
                            {/* Close */}
                            <Button
                                type="button"
                                onClick={onClose}
                                className="absolute top-5 right-5 z-20 size-9 grid place-items-center rounded-full bg-white/90 hover:bg-white text-yp-muted hover:text-yp-deep border border-yp-line transition"
                                aria-label="Cerrar"
                            >
                                <Icon name="close" className="h-4 w-4" />
                            </Button>

                            <div className="grid lg:grid-cols-[360px_1fr]">
                                {/* LEFT — branded summary */}
                                <div className="relative yp-gradient-radial text-white p-7 lg:min-h-[640px] flex flex-col overflow-hidden">
                                    <div className="absolute inset-0 grid-bg opacity-40" />
                                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/15 blur-3xl" />

                                    <div className="relative">
                                        <div className="text-[10px] tracking-[0.3em] text-accent mb-3 uppercase">
                                            Cotización
                                        </div>
                                        <h2 className="font-display font-black text-[28px] leading-[1.05] tracking-tight">
                                            {product.name}
                                        </h2>
                                        <div className="mt-3 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                                            <span className="size-1.5 rounded-full bg-emerald-400" />
                                            <span className="text-[9.5px] tracking-[0.18em] uppercase text-white/85">
                                                En stock
                                            </span>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="relative mt-6 aspect-square rounded-2xl bg-white/[0.06] border border-white/10 grid place-items-center overflow-hidden">
                                        {product.imageUrl ? (
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="absolute inset-0 w-full h-full object-contain p-6"
                                            />
                                        ) : (
                                            <div className="relative text-center text-[10px] tracking-[0.3em] text-white/40">
                                                SIN IMAGEN
                                            </div>
                                        )}
                                    </div>

                                    {/* Live total */}
                                    <div className="relative mt-auto pt-6">
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-baseline justify-between text-[12.5px] text-white/70">
                                                <span>Unidad · {totalQty} uds</span>
                                                <span>{fmtCOP(subtotalProduct)}</span>
                                            </div>
                                            {selectedPrintingMethodName && (
                                                <div className="flex items-baseline justify-between text-[12.5px] text-white/70">
                                                    <span>Marcación · {selectedPrintingMethodName}</span>
                                                    <span>{fmtCOP(Math.max(0, subtotalPrinting))}</span>
                                                </div>
                                            )}
                                            <div className="h-px bg-white/15 my-2" />
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">
                                                    Total estimado
                                                </span>
                                                <span className="font-display font-black text-[28px] text-accent tracking-tight">
                                                    {fmtCOP(totalPrice)}
                                                </span>
                                            </div>
                                            <div className="text-[9.5px] tracking-[0.15em] uppercase text-white/40">
                                                Sin envío incluido
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT — form */}
                                <div className="p-7 lg:p-9 max-h-[90vh] overflow-y-auto">
                                    {/* STEP 01 colors */}
                                    <div className="mb-7">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-yp-deep text-accent grid place-items-center font-display font-black text-[13px]">
                                                    1
                                                </div>
                                                <div>
                                                    <div className="text-[10px] tracking-[0.25em] text-yp-muted uppercase">
                                                        Paso · 01
                                                    </div>
                                                    <div className="font-display font-bold text-[16px] text-yp-deep leading-tight">
                                                        Selecciona colores
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-[10px] tracking-[0.2em] text-yp-muted uppercase">
                                                {selectedColors.length} / {product.colors.length}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 bg-yp-paper rounded-2xl p-2">
                                            {product.colors.map((c) => {
                                                const selected = !!selectedColors.find((x) => x.name === c.name);
                                                const isLight = LIGHT_HEXES.has(c.hexCode.toLowerCase());
                                                return (
                                                    <Button
                                                        key={c.name + c.hexCode}
                                                        type="button"
                                                        onClick={() => toggleColor(c)}
                                                        className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition ${
                                                            selected
                                                                ? 'bg-yp-deep/[0.04] ring-1 ring-yp-deep/15'
                                                                : 'hover:bg-yp-paper'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`size-10 rounded-full border grid place-items-center ${
                                                                selected
                                                                    ? 'ring-2 ring-offset-2 ring-offset-white ring-yp-deep'
                                                                    : 'border-yp-line group-hover:border-yp-muted'
                                                            }`}
                                                            style={{ background: c.hexCode }}
                                                        >
                                                            {selected && (
                                                                <Icon
                                                                    name="check"
                                                                    className={`h-3.5 w-3.5 ${isLight ? 'text-yp-deep' : 'text-white'}`}
                                                                />
                                                            )}
                                                        </span>
                                                        <span className="text-[9.5px] tracking-wider text-yp-muted uppercase">
                                                            {c.name}
                                                        </span>
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* STEP 02 quantities */}
                                    {selectedColors.length > 0 && (
                                        <div className="mb-7">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-lg bg-yp-deep text-accent grid place-items-center font-display font-black text-[13px]">
                                                        2
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] tracking-[0.25em] text-yp-muted uppercase">
                                                            Paso · 02
                                                        </div>
                                                        <div className="font-display font-bold text-[16px] text-yp-deep leading-tight">
                                                            Cantidades por color
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] tracking-[0.2em] text-yp-muted uppercase">
                                                    Total · <span className="text-yp-deep font-bold">{totalQty} uds</span>
                                                </div>
                                            </div>
                                            <div className="bg-white border border-yp-line rounded-2xl divide-y divide-yp-line overflow-hidden">
                                                {selectedColors.map((c) => (
                                                    <div key={c.name} className="flex items-center gap-4 px-4 py-3">
                                                        <span
                                                            className="size-9 rounded-lg border border-yp-line shrink-0"
                                                            style={{ background: c.hexCode }}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-display font-bold text-[14px] text-yp-deep leading-tight">
                                                                {c.name}
                                                            </div>
                                                            <div className="text-[9.5px] tracking-wider uppercase text-yp-muted mt-0.5">
                                                                {c.hexCode}
                                                            </div>
                                                        </div>
                                                        <Stepper
                                                            value={quantities[c.name] || 0}
                                                            onChange={(v) =>
                                                                setQuantities((q) => ({ ...q, [c.name]: isNaN(v) ? 0 : v }))
                                                            }
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={() => removeColor(c.name)}
                                                            className="size-8 grid place-items-center rounded-full text-yp-muted hover:bg-red-50 hover:text-red-500 transition"
                                                            aria-label="Quitar color"
                                                        >
                                                            <Icon name="close" className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 03 printing method */}
                                    {product.printingMethods?.length > 0 && (
                                        <div className="mb-7">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="size-8 rounded-lg bg-yp-deep text-accent grid place-items-center font-display font-black text-[13px]">
                                                    3
                                                </div>
                                                <div>
                                                    <div className="text-[10px] tracking-[0.25em] text-yp-muted uppercase">
                                                        Paso · 03
                                                    </div>
                                                    <div className="font-display font-bold text-[16px] text-yp-deep leading-tight">
                                                        Método de marcación{' '}
                                                        <span className="text-[10px] text-yp-muted tracking-wide normal-case ml-1">
                                                            opcional
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={() => setSelectedPrintingMethodName('')}
                                                    className={`text-left p-4 rounded-xl border transition ${
                                                        !selectedPrintingMethodName
                                                            ? 'border-yp-deep bg-yp-deep/[0.04] ring-1 ring-yp-deep/15'
                                                            : 'border-yp-line bg-white hover:bg-yp-paper'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <span
                                                            className={`size-4 rounded-full border-2 grid place-items-center ${
                                                                !selectedPrintingMethodName
                                                                    ? 'border-yp-deep'
                                                                    : 'border-yp-line'
                                                            }`}
                                                        >
                                                            {!selectedPrintingMethodName && (
                                                                <span className="size-2 rounded-full bg-yp-deep" />
                                                            )}
                                                        </span>
                                                        <span className="font-display font-bold text-[13.5px] text-yp-deep">
                                                            Sin marcación
                                                        </span>
                                                    </div>
                                                    <div className="mt-1.5 text-[10px] tracking-wide uppercase text-yp-muted pl-6">
                                                        Producto en blanco
                                                    </div>
                                                </Button>
                                                {product.printingMethods.map((m) => {
                                                    const active = selectedPrintingMethodName === m.name;
                                                    return (
                                                        <Button
                                                            key={m.id}
                                                            type="button"
                                                            onClick={() => setSelectedPrintingMethodName(m.name)}
                                                            className={`text-left p-4 rounded-xl border transition ${
                                                                active
                                                                    ? 'border-yp-deep bg-yp-deep/[0.04] ring-1 ring-yp-deep/15'
                                                                    : 'border-yp-line bg-white hover:bg-yp-paper'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2.5">
                                                                <span
                                                                    className={`size-4 rounded-full border-2 grid place-items-center ${
                                                                        active ? 'border-yp-deep' : 'border-yp-line'
                                                                    }`}
                                                                >
                                                                    {active && (
                                                                        <span className="size-2 rounded-full bg-yp-deep" />
                                                                    )}
                                                                </span>
                                                                <span className="font-display font-bold text-[13.5px] text-yp-deep">
                                                                    {m.name}
                                                                </span>
                                                            </div>
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 04 area */}
                                    {selectedPrintingMethodName && product.isPrintPersonalizable && (
                                        <div className="mb-7">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="size-8 rounded-lg bg-yp-deep text-accent grid place-items-center font-display font-black text-[13px]">
                                                    4
                                                </div>
                                                <div>
                                                    <div className="text-[10px] tracking-[0.25em] text-yp-muted uppercase">
                                                        Paso · 04
                                                    </div>
                                                    <div className="font-display font-bold text-[16px] text-yp-deep leading-tight">
                                                        Área de marcación
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white border border-yp-line rounded-2xl p-5 grid sm:grid-cols-[1fr_180px] gap-6 items-center">
                                                <div className="space-y-3">
                                                    <SizeRow
                                                        label="Ancho · cm"
                                                        max={maxW || 1}
                                                        value={widthCm}
                                                        onChange={setWidthCm}
                                                    />
                                                    <SizeRow
                                                        label="Alto · cm"
                                                        max={maxH || 1}
                                                        value={heightCm}
                                                        onChange={setHeightCm}
                                                    />
                                                </div>
                                                <div className="relative bg-yp-paper rounded-xl border border-dashed border-yp-line aspect-square grid place-items-center">
                                                    <div className="absolute top-2 left-2 text-[9px] tracking-[0.2em] uppercase text-yp-muted">
                                                        Vista
                                                    </div>
                                                    <div
                                                        className="bg-accent/20 border border-accent rounded grid place-items-center"
                                                        style={{
                                                            width: `${(widthCm / (maxW || 1)) * 70}%`,
                                                            height: `${(heightCm / (maxH || 1)) * 70}%`,
                                                            minWidth: 20,
                                                            minHeight: 20,
                                                        }}
                                                    >
                                                        <div className="text-[9px] text-yp-deep font-bold">
                                                            {widthCm}×{heightCm}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-yp-line">
                                        <Button
                                            type="button"
                                            onClick={handleCancel}
                                            className="sm:w-auto px-6 py-3.5 rounded-full text-[10.5px] tracking-[0.2em] uppercase text-yp-ink hover:bg-yp-paper border border-yp-line transition"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleAdd}
                                            disabled={!canSubmit}
                                            className={`flex-1 px-6 py-3.5 rounded-full text-[10.5px] tracking-[0.2em] uppercase inline-flex items-center justify-center gap-3 transition ${
                                                canSubmit
                                                    ? 'bg-yp-deep text-accent hover:bg-yp-mid'
                                                    : 'bg-yp-line/50 text-yp-muted cursor-not-allowed'
                                            }`}
                                        >
                                            Agregar a cotización · {fmtCOP(totalPrice)}
                                            {canSubmit && <Icon name="arrowRight" className="h-3.5 w-3.5" />}
                                        </Button>
                                    </div>

                                    {!canSubmit && (
                                        <div className="mt-3 flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-yp-muted">
                                            <Icon name="info" className="h-3 w-3" /> Selecciona al menos un color con
                                            cantidad
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-root') || document.body);
};

const SizeRow: React.FC<{ label: string; max: number; value: number; onChange: (v: number) => void }> = ({
    label, max, value, onChange,
}) => (
    <div>
        <div className="flex items-baseline justify-between mb-1.5">
            <label className="text-[10px] tracking-[0.2em] uppercase text-yp-muted">{label}</label>
            <span className="text-[10px] text-yp-muted">Máx · {max}cm</span>
        </div>
        <div className="flex items-center gap-3">
            <input
                type="range"
                min={1}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="flex-1 accent-yp-deep"
            />
            <input
                type="number"
                value={value}
                min={1}
                max={max}
                onChange={(e) =>
                    onChange(Math.min(max, Math.max(1, parseInt(e.target.value, 10) || 1)))
                }
                className="w-16 px-2 py-1.5 bg-yp-paper border border-yp-line rounded-lg text-center text-[13px] font-bold text-yp-deep focus:outline-none focus:border-yp-deep [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
        </div>
    </div>
);

export default QuotationModal;
