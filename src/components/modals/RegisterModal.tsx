import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useRegisterUser from '../../hooks/useRegisterUser';
import { useModal } from '../../context/ModalContext';
import { MESSAGE } from '../../constants/message';
import RegisterUser from '../../types/RegisterUser';
import Icon from '../icon/Icon';
import Button from '../Button';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type UserType = 'REGULAR' | 'WHOLESALER';

interface RegisterFormInputs {
    name: string;
    phone: string;
    email: string;
    rut: File | null;
    username: string;
    password: string;
}

const MAX = { name: 50, phone: 10, email: 50, username: 50, password: 20 };
const MIN_USER = 5;
const MIN_PASS = 8;

type FieldProps = {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    iconName: string;
    error?: string;
    maxLen?: number;
    showCounter?: boolean;
    right?: React.ReactNode;
    prefix?: string;
    onlyNumbers?: boolean;
};

const Field: React.FC<FieldProps> = ({
    id, label, type = 'text', value, onChange, iconName, error,
    maxLen, showCounter, right, prefix, onlyNumbers,
}) => {
    const [focused, setFocused] = useState(false);
    const filled = !!value;
    const float = focused || filled;
    const hasError = !!error;

    const handleChange = (raw: string) => {
        let v = raw;
        if (onlyNumbers) v = v.replace(/[^0-9]/g, '');
        if (maxLen) v = v.slice(0, maxLen);
        onChange(v);
    };

    return (
        <div>
            <div
                className={`relative bg-white rounded-2xl border transition-all ${
                    hasError
                        ? 'border-red-500'
                        : focused
                        ? 'border-yp-deep ring-4 ring-yp-deep/10'
                        : 'border-yp-line hover:border-yp-bright/40'
                }`}
            >
                <div className="flex items-center">
                    <div className={`pl-4 transition-colors ${hasError ? 'text-red-500' : focused ? 'text-yp-deep' : 'text-yp-muted'}`}>
                        <Icon name={iconName} className="h-[17px] w-[17px]" />
                    </div>
                    <div className="relative flex-1 pl-3 pr-3">
                        <label
                            htmlFor={id}
                            className={`absolute left-3 pointer-events-none transition-all ${
                                float
                                    ? `top-1.5 text-[9.5px] font-mono tracking-[0.15em] uppercase ${hasError ? 'text-red-500' : 'text-yp-bright'}`
                                    : 'top-1/2 -translate-y-1/2 text-[11px] text-yp-muted'
                            }`}
                        >
                            {label}
                        </label>
                        <div className="flex items-center pt-[22px] pb-2">
                            {prefix && float && (
                                <span className="text-[14px] font-semibold text-yp-muted mr-1.5 select-none">{prefix}</span>
                            )}
                            <input
                                id={id}
                                type={type}
                                value={value}
                                onChange={(e) => handleChange(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                inputMode={onlyNumbers ? 'numeric' : undefined}
                                className="w-full bg-transparent outline-none text-[14px] font-semibold text-yp-deep pr-1"
                            />
                        </div>
                    </div>
                    {right && <div className="pr-3">{right}</div>}
                </div>
            </div>
            <div className="mt-1.5 px-1 flex items-start justify-between gap-3 min-h-[14px]">
                <div className="flex-1">
                    {hasError && <div className="font-mono text-[10.5px] text-red-500 tracking-wide">{error}</div>}
                </div>
                {showCounter && maxLen && (
                    <div
                        className={`font-mono text-[10px] tracking-wider shrink-0 ${
                            value.length >= maxLen ? 'text-red-500' : 'text-yp-muted'
                        }`}
                    >
                        {value.length}/{maxLen}
                    </div>
                )}
            </div>
        </div>
    );
};

const FileField: React.FC<{ file: File | null; onChange: (f: File | null) => void; error?: string }> = ({
    file, onChange, error,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (f?: File | null) => {
        if (!f) return;
        if (!f.name.toLowerCase().endsWith('.pdf')) return;
        if (f.size > 5 * 1024 * 1024) return;
        onChange(f);
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {file ? (
                <div
                    className={`bg-white rounded-2xl border-2 ${
                        error ? 'border-red-500' : 'border-emerald-500/40'
                    } p-3.5 flex items-center gap-3`}
                >
                    <div className="size-10 rounded-xl bg-emerald-500/10 grid place-items-center text-emerald-600 shrink-0">
                        <Icon name="file" className="h-[18px] w-[18px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13.5px] text-yp-deep truncate">{file.name}</div>
                        <div className="font-mono text-[10px] tracking-wider text-yp-muted mt-0.5">
                            PDF · {(file.size / 1024).toFixed(0)} KB
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={() => onChange(null)}
                        className="size-7 grid place-items-center rounded-lg text-yp-muted hover:text-red-500 hover:bg-yp-paper transition"
                        aria-label="Quitar archivo"
                    >
                        <Icon name="close" className="h-3.5 w-3.5" />
                    </Button>
                </div>
            ) : (
                <button
                    type="button"
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        handleFile(e.dataTransfer.files?.[0]);
                    }}
                    onClick={() => inputRef.current?.click()}
                    className={`w-full rounded-2xl border-2 border-dashed transition p-4 flex items-center gap-3 text-left ${
                        dragging
                            ? 'border-yp-deep bg-yp-paper'
                            : error
                            ? 'border-red-500'
                            : 'border-yp-line bg-white hover:border-yp-bright/60 hover:bg-yp-paper'
                    }`}
                >
                    <div className="size-10 rounded-xl bg-accent grid place-items-center text-yp-deep shrink-0">
                        <Icon name="upload" className="h-[17px] w-[17px]" />
                    </div>
                    <div className="flex-1">
                        <div className="font-mono text-[10px] tracking-[0.2em] text-yp-bright uppercase mb-0.5">
                            ADJUNTAR RUT · OBLIGATORIO
                        </div>
                        <div className="text-[13px] font-semibold text-yp-deep">
                            Arrastra el PDF aquí o haz click para buscar
                        </div>
                        <div className="text-[11px] text-yp-muted mt-0.5">Solo PDF · máx. 5 MB</div>
                    </div>
                </button>
            )}
            {error && <div className="mt-1 px-1 font-mono text-[10px] text-red-500 tracking-wide">{error}</div>}
        </div>
    );
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
    const { mutate, isPending } = useRegisterUser();
    const { openModal } = useModal();
    const [userType, setUserType] = useState<UserType>('REGULAR');
    const [showPass, setShowPass] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [terms, setTerms] = useState(false);

    const {
        register, handleSubmit, setValue, watch, reset, control,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        defaultValues: { name: '', phone: '', email: '', rut: null, username: '', password: '' },
    });

    register('name', {
        required: 'Este campo es requerido',
        maxLength: { value: MAX.name, message: `Máximo ${MAX.name} caracteres` },
    });
    register('phone', {
        required: 'Este campo es requerido',
        pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' },
        minLength: { value: MAX.phone, message: `Debe tener ${MAX.phone} dígitos` },
    });
    register('email', {
        required: 'Este campo es requerido',
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Correo inválido' },
    });
    register('username', {
        required: 'Este campo es requerido',
        minLength: { value: MIN_USER, message: `Mínimo ${MIN_USER} caracteres` },
        maxLength: { value: MAX.username, message: `Máximo ${MAX.username} caracteres` },
    });
    register('password', {
        required: 'Este campo es requerido',
        minLength: { value: MIN_PASS, message: `Mínimo ${MIN_PASS} caracteres` },
        maxLength: { value: MAX.password, message: `Máximo ${MAX.password} caracteres` },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: 'Debe cumplir todos los requisitos',
        },
    });

    const v = watch();

    const passStrength = useMemo(() => {
        const pw = v.password || '';
        if (!pw) return { score: 0, checks: [] as { id: string; label: string; ok: boolean }[] };
        const checks = [
            { id: 'len', label: `${MIN_PASS}+ caracteres`, ok: pw.length >= MIN_PASS },
            { id: 'low', label: 'Minúscula', ok: /[a-z]/.test(pw) },
            { id: 'up', label: 'Mayúscula', ok: /[A-Z]/.test(pw) },
            { id: 'num', label: 'Número', ok: /\d/.test(pw) },
        ];
        return { score: checks.filter((c) => c.ok).length, checks };
    }, [v.password]);

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

    const resetAll = () => {
        reset({ name: '', phone: '', email: '', rut: null, username: '', password: '' });
        setPrivacy(false);
        setTerms(false);
        setUserType('REGULAR');
        setShowPass(false);
    };

    const handleClose = () => {
        resetAll();
        onClose();
    };

    const onSubmit = (data: RegisterFormInputs) => {
        if (!privacy || !terms || isPending) return;
        if (userType === 'WHOLESALER' && !data.rut) {
            openModal('notification', MESSAGE.MISSING_RUT_FILE, 'info');
            return;
        }
        const newUser: RegisterUser = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            username: data.username,
            password: data.password,
            role: userType,
        };
        if (userType === 'WHOLESALER' && data.rut) {
            mutate({ user: newUser, file: data.rut });
        } else {
            mutate({ user: newUser });
        }
        resetAll();
    };

    const canSubmit = privacy && terms && !isPending;

    const BENEFITS = userType === 'REGULAR'
        ? [['Precios al detal', 'y por unidad'], ['Cotización rápida', 'sin papeleo'], ['Catálogo completo', 'de productos']]
        : [['Precios mayoristas', 'exclusivos'], ['Volúmenes especiales', 'para tus campañas'], ['Atención prioritaria', 'con asesor dedicado']];

    const TYPES = [
        { id: 'REGULAR' as const, label: 'Regular', desc: 'Cliente final', icon: 'user' },
        { id: 'WHOLESALER' as const, label: 'Publicista', desc: 'Mayorista · RUT', icon: 'building' },
    ];

    const content = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] grid place-items-center p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-yp-deep/55"
                        style={{ backdropFilter: 'blur(8px)' }}
                    />
                    <motion.div
                        initial={{ y: 20, scale: 0.97, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 20, scale: 0.97, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                        className="relative w-full max-w-[1020px] my-8 rounded-[28px] overflow-hidden bg-white grid md:grid-cols-[1fr_1.35fr]"
                        style={{ boxShadow: '0 30px 80px -20px rgba(0,31,54,0.55), 0 8px 24px -8px rgba(0,31,54,0.25)' }}
                    >
                        {/* Branded panel */}
                        <div className="relative yp-gradient-radial text-white p-7 lg:p-9 hidden md:flex flex-col justify-between overflow-hidden">
                            <div className="absolute inset-0 grid-bg opacity-50" />
                            <div className="absolute -top-24 -right-24 size-[280px] rounded-full bg-accent/10 blur-2xl" />
                            <div className="absolute bottom-[-80px] left-[-60px] size-[260px] rounded-full bg-yp-mid/40 blur-3xl" />

                            <div className="relative">
                                <div className="flex items-center gap-2">
                                    <div className="size-9 grid place-items-center rounded-xl bg-accent text-yp-deep font-display font-black text-[15px]">
                                        Y
                                    </div>
                                    <div>
                                        <div className="font-display font-black text-[15px] leading-none">YANCA</div>
                                        <div className="font-mono text-[9px] tracking-[0.25em] text-white/60 mt-0.5">
                                            PUBLICIDAD · CALI
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="font-mono text-[10.5px] tracking-[0.3em] text-accent mb-3">CREAR CUENTA</div>
                                    <h2 className="font-display font-black text-[30px] leading-[0.96] tracking-tight">
                                        Un único<br />registro,<br />todo el catálogo.
                                    </h2>
                                    <p className="mt-4 text-white/65 text-[13px] max-w-[300px] leading-relaxed">
                                        Crea tu cuenta y obtén acceso a la lista completa de precios, cotizaciones guardadas y
                                        seguimiento de pedidos.
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-8">
                                <div className="font-mono text-[9.5px] tracking-[0.25em] text-white/45 mb-3">
                                    {userType === 'REGULAR' ? 'BENEFICIOS · REGULAR' : 'BENEFICIOS · PUBLICISTA'}
                                </div>
                                <div className="space-y-2.5">
                                    {BENEFITS.map(([a, b]) => (
                                        <div key={a} className="flex items-start gap-3 text-[12.5px]">
                                            <div className="size-5 rounded-full bg-accent grid place-items-center text-yp-deep shrink-0 mt-0.5">
                                                <Icon name="check" className="h-[11px] w-[11px]" />
                                            </div>
                                            <div>
                                                <span className="text-white font-semibold">{a}</span>{' '}
                                                <span className="text-white/55">{b}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-white/55">
                                    <Icon name="shield" className="h-3 w-3" /> CONEXIÓN SEGURA · SSL
                                </div>
                                <div className="font-mono text-[9.5px] tracking-[0.2em] text-white/45">
                                    v · {new Date().getFullYear()}
                                </div>
                            </div>
                        </div>

                        {/* Form panel */}
                        <div className="relative p-7 sm:p-9 lg:p-10 flex flex-col max-h-[92vh] overflow-y-auto">
                            <Button
                                type="button"
                                onClick={handleClose}
                                className="absolute top-5 right-5 size-9 grid place-items-center rounded-full bg-yp-paper hover:bg-yp-line/60 text-yp-muted hover:text-yp-deep transition z-10"
                                aria-label="Cerrar"
                            >
                                <Icon name="close" className="h-4 w-4" />
                            </Button>

                            <div className="font-mono text-[10.5px] tracking-[0.3em] text-yp-bright mb-2">REGÍSTRATE</div>
                            <h1 className="font-display font-black text-[26px] sm:text-[30px] leading-[1.02] tracking-tight text-yp-deep">
                                Crea tu cuenta.
                            </h1>
                            <p className="mt-2 text-[12.5px] text-yp-muted max-w-[380px]">
                                ¡Un único registro y tendrás acceso a toda nuestra lista de precios!
                            </p>

                            {/* User type selector */}
                            <div className="mt-5 mb-1">
                                <div className="font-mono text-[10px] tracking-[0.25em] text-yp-muted mb-2">TIPO DE CUENTA</div>
                                <div className="grid grid-cols-2 gap-2 p-1 bg-yp-paper rounded-2xl border border-yp-line">
                                    {TYPES.map((t) => {
                                        const active = userType === t.id;
                                        return (
                                            <Button
                                                key={t.id}
                                                type="button"
                                                onClick={() => setUserType(t.id)}
                                                className={`relative px-3 py-2.5 rounded-xl text-left transition-all ${
                                                    active ? 'bg-yp-deep text-white' : 'text-yp-ink hover:bg-white'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <div
                                                        className={`size-7 grid place-items-center rounded-lg ${
                                                            active ? 'bg-accent text-yp-deep' : 'bg-yp-line/50 text-yp-muted'
                                                        }`}
                                                    >
                                                        <Icon name={t.icon} className="h-3.5 w-3.5" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className={`font-display font-bold text-[13.5px] ${active ? 'text-white' : 'text-yp-deep'}`}>
                                                            {t.label}
                                                        </div>
                                                        <div className={`text-[10.5px] font-mono tracking-wider uppercase ${active ? 'text-accent' : 'text-yp-muted'}`}>
                                                            {t.desc}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
                                {/* 01 contact */}
                                <div>
                                    <div className="font-mono text-[9.5px] tracking-[0.25em] text-yp-muted mb-2.5">
                                        01 · DATOS DE CONTACTO
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Field
                                            id="name"
                                            label={userType === 'WHOLESALER' ? 'Nombre / Empresa' : 'Nombre completo'}
                                            iconName="user"
                                            value={v.name || ''}
                                            onChange={(val) => setValue('name', val, { shouldValidate: true })}
                                            error={errors.name?.message}
                                            maxLen={MAX.name}
                                            showCounter={(v.name || '').length > 0}
                                        />
                                        <Field
                                            id="phone"
                                            label="Celular"
                                            iconName="phone"
                                            prefix="+57"
                                            onlyNumbers
                                            value={v.phone || ''}
                                            onChange={(val) => setValue('phone', val, { shouldValidate: true })}
                                            error={errors.phone?.message}
                                            maxLen={MAX.phone}
                                            showCounter={(v.phone || '').length > 0}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <Field
                                            id="email"
                                            label="Correo electrónico"
                                            type="email"
                                            iconName="mail"
                                            value={v.email || ''}
                                            onChange={(val) => setValue('email', val, { shouldValidate: true })}
                                            error={errors.email?.message}
                                            maxLen={MAX.email}
                                            showCounter={(v.email || '').length > 0}
                                        />
                                    </div>
                                </div>

                                {userType === 'WHOLESALER' && (
                                    <div>
                                        <div className="font-mono text-[9.5px] tracking-[0.25em] text-yp-muted mb-2.5">
                                            02 · DOCUMENTO LEGAL
                                        </div>
                                        <Controller
                                            name="rut"
                                            control={control}
                                            rules={{ required: 'Debes adjuntar el RUT' }}
                                            render={({ field, fieldState }) => (
                                                <FileField
                                                    file={field.value as File | null}
                                                    onChange={(f) => field.onChange(f)}
                                                    error={fieldState.error?.message}
                                                />
                                            )}
                                        />
                                    </div>
                                )}

                                {/* Credentials */}
                                <div>
                                    <div className="font-mono text-[9.5px] tracking-[0.25em] text-yp-muted mb-2.5">
                                        {userType === 'WHOLESALER' ? '03' : '02'} · CREDENCIALES DE ACCESO
                                    </div>
                                    <div className="space-y-3">
                                        <Field
                                            id="username"
                                            label="Nombre de usuario"
                                            iconName="at"
                                            value={v.username || ''}
                                            onChange={(val) => setValue('username', val, { shouldValidate: true })}
                                            error={errors.username?.message}
                                            maxLen={MAX.username}
                                            showCounter={(v.username || '').length > 0}
                                        />
                                        <Field
                                            id="password"
                                            label="Contraseña"
                                            type={showPass ? 'text' : 'password'}
                                            iconName="lock"
                                            value={v.password || ''}
                                            onChange={(val) => setValue('password', val, { shouldValidate: true })}
                                            error={errors.password?.message}
                                            maxLen={MAX.password}
                                            showCounter={(v.password || '').length > 0}
                                            right={
                                                <Button
                                                    type="button"
                                                    onClick={() => setShowPass((s) => !s)}
                                                    className="size-8 grid place-items-center rounded-lg text-yp-muted hover:text-yp-deep hover:bg-yp-paper transition"
                                                    aria-label={showPass ? 'Ocultar' : 'Mostrar'}
                                                >
                                                    <Icon name={showPass ? 'eyeoff' : 'eye'} className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                        {(v.password || '').length > 0 && (
                                            <div className="px-1">
                                                <div className="flex gap-1 mb-2">
                                                    {[1, 2, 3, 4].map((i) => {
                                                        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-600'];
                                                        const active = passStrength.score >= i;
                                                        return (
                                                            <div
                                                                key={i}
                                                                className={`h-1 flex-1 rounded-full transition-all ${
                                                                    active ? colors[passStrength.score - 1] : 'bg-yp-line'
                                                                }`}
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <div className="flex flex-wrap gap-x-3 gap-y-1">
                                                    {passStrength.checks.map((c) => (
                                                        <div
                                                            key={c.id}
                                                            className={`flex items-center gap-1 font-mono text-[9.5px] tracking-wider uppercase ${
                                                                c.ok ? 'text-emerald-600' : 'text-yp-muted'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`size-2.5 rounded-full grid place-items-center ${
                                                                    c.ok ? 'bg-emerald-600' : 'bg-yp-line'
                                                                }`}
                                                            >
                                                                {c.ok && <Icon name="check" className="h-1.5 w-1.5 text-white" />}
                                                            </span>
                                                            {c.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Legal checkboxes */}
                                <div className="pt-2 space-y-2.5">
                                    <Button
                                        type="button"
                                        onClick={() => setPrivacy((p) => !p)}
                                        className="flex items-start gap-2.5 group w-full text-left"
                                    >
                                        <span
                                            className={`size-[18px] mt-0.5 rounded-[5px] border-[1.5px] grid place-items-center transition shrink-0 ${
                                                privacy ? 'bg-yp-deep border-yp-deep' : 'border-yp-line group-hover:border-yp-bright'
                                            }`}
                                        >
                                            {privacy && <Icon name="check" className="h-2.5 w-2.5 text-accent" />}
                                        </span>
                                        <span className="text-[12.5px] text-yp-ink leading-snug">
                                            He leído y acepto la{' '}
                                            <Link
                                                to="/politicas-privacidad"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-yp-bright font-semibold border-b border-yp-bright/30 hover:border-yp-deep hover:text-yp-deep"
                                            >
                                                Política de Privacidad
                                            </Link>
                                        </span>
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setTerms((t) => !t)}
                                        className="flex items-start gap-2.5 group w-full text-left"
                                    >
                                        <span
                                            className={`size-[18px] mt-0.5 rounded-[5px] border-[1.5px] grid place-items-center transition shrink-0 ${
                                                terms ? 'bg-yp-deep border-yp-deep' : 'border-yp-line group-hover:border-yp-bright'
                                            }`}
                                        >
                                            {terms && <Icon name="check" className="h-2.5 w-2.5 text-accent" />}
                                        </span>
                                        <span className="text-[12.5px] text-yp-ink leading-snug">
                                            Acepto los{' '}
                                            <Link
                                                to="/aviso-legal"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-yp-bright font-semibold border-b border-yp-bright/30 hover:border-yp-deep hover:text-yp-deep"
                                            >
                                                Términos y Condiciones
                                            </Link>
                                        </span>
                                    </Button>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className={`w-full mt-4 group relative overflow-hidden font-bold text-[13px] tracking-[0.12em] uppercase py-4 rounded-2xl transition flex items-center justify-center gap-2.5 ${
                                        canSubmit
                                            ? 'bg-yp-deep hover:bg-yp-mid text-white'
                                            : 'bg-yp-line/50 text-yp-muted cursor-not-allowed'
                                    }`}
                                >
                                    {isPending ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                                                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                            Creando cuenta…
                                        </>
                                    ) : (
                                        <>
                                            Crear cuenta
                                            <span
                                                className={`size-7 rounded-full grid place-items-center transition ${
                                                    canSubmit
                                                        ? 'bg-accent text-yp-deep group-hover:translate-x-0.5'
                                                        : 'bg-white/40 text-yp-muted'
                                                }`}
                                            >
                                                <Icon name="arrowRight" className="h-3 w-3" />
                                            </span>
                                        </>
                                    )}
                                </Button>

                                <div className="text-center text-[11.5px] text-yp-muted pt-2">
                                    ¿Ya tienes cuenta?{' '}
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            handleClose();
                                            openModal('login');
                                        }}
                                        className="font-semibold text-yp-bright hover:text-yp-deep border-b border-yp-bright/30 hover:border-yp-deep pb-0.5"
                                    >
                                        Inicia sesión
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-root') || document.body);
};

export default RegisterModal;
