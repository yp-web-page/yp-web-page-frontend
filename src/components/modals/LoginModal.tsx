import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import Icon from '../icon/Icon';
import Button from '../Button';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

interface LoginFormInputs {
    username: string;
    password: string;
    rememberme: boolean;
}

const MIN_USER = 5;
const MAX_USER = 50;
const MIN_PASS = 8;
const MAX_PASS = 20;

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
    onFocus?: () => void;
    onBlur?: () => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const Field: React.FC<FieldProps> = ({
    id, label, type = 'text', value, onChange, iconName, error,
    maxLen, showCounter, right, inputProps,
}) => {
    const [focused, setFocused] = useState(false);
    const filled = !!value;
    const float = focused || filled;
    const hasError = !!error;

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
                        <input
                            id={id}
                            type={type}
                            value={value}
                            onChange={(e) => onChange(maxLen ? e.target.value.slice(0, maxLen) : e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className="w-full bg-transparent outline-none pt-[22px] pb-2 pr-1 text-[14px] font-semibold text-yp-deep"
                            {...inputProps}
                        />
                    </div>
                    {right && <div className="pr-3">{right}</div>}
                </div>
            </div>
            <div className="mt-1.5 px-1 flex items-start justify-between gap-3 min-h-[14px]">
                <div className="flex-1">
                    {hasError && (
                        <div className="font-mono text-[10.5px] text-red-500 tracking-wide">{error}</div>
                    )}
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

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
    const { login } = useAuth();
    const { openModal } = useModal();
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<LoginFormInputs>({
        defaultValues: { rememberme: false },
    });
    const [showPass, setShowPass] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const username = watch('username') || '';
    const password = watch('password') || '';
    const remember = watch('rememberme') || false;

    register('username', {
        required: 'Este campo es requerido',
        minLength: { value: MIN_USER, message: `Mínimo ${MIN_USER} caracteres` },
        maxLength: { value: MAX_USER, message: `Máximo ${MAX_USER} caracteres` },
    });
    register('password', {
        required: 'Este campo es requerido',
        minLength: { value: MIN_PASS, message: `Mínimo ${MIN_PASS} caracteres` },
        maxLength: { value: MAX_PASS, message: `Máximo ${MAX_PASS} caracteres` },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: 'Debe cumplir todos los requisitos',
        },
    });

    const passStrength = (() => {
        if (!password) return { score: 0, checks: [] as { id: string; label: string; ok: boolean }[] };
        const checks = [
            { id: 'len', label: `${MIN_PASS}+ caracteres`, ok: password.length >= MIN_PASS },
            { id: 'low', label: 'Minúscula', ok: /[a-z]/.test(password) },
            { id: 'up', label: 'Mayúscula', ok: /[A-Z]/.test(password) },
            { id: 'num', label: 'Número', ok: /\d/.test(password) },
        ];
        return { score: checks.filter((c) => c.ok).length, checks };
    })();

    useEffect(() => {
        const remembered = localStorage.getItem('rememberedUsername');
        if (remembered) reset({ username: remembered, rememberme: true });
    }, [reset]);

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

    const handleClose = () => {
        reset({ username: '', password: '', rememberme: false });
        setShowPass(false);
        onClose();
    };

    const onSubmit = (data: LoginFormInputs) => {
        setSubmitting(true);
        login(data);
        setTimeout(() => {
            setSubmitting(false);
            handleClose();
        }, 600);
    };

    const handleOpenRegister = () => {
        handleClose();
        onSwitchToRegister();
    };

    const handleRecover = () => openModal('recover');

    const content = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] grid place-items-center p-4">
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
                        className="relative w-full max-w-[920px] rounded-[28px] overflow-hidden bg-white grid md:grid-cols-[1.05fr_1.2fr]"
                        style={{ boxShadow: '0 30px 80px -20px rgba(0,31,54,0.55), 0 8px 24px -8px rgba(0,31,54,0.25)' }}
                    >
                        {/* Branded panel */}
                        <div className="relative yp-gradient-radial text-white p-8 lg:p-10 hidden md:flex flex-col justify-between overflow-hidden min-h-[560px]">
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

                                <div className="mt-12">
                                    <div className="font-mono text-[10.5px] tracking-[0.3em] text-accent mb-4">
                                        PORTAL DE CLIENTES
                                    </div>
                                    <h2 className="font-display font-black text-[34px] leading-[0.95] tracking-tight">
                                        Cotiza y<br />
                                        gestiona tus<br />
                                        pedidos.
                                    </h2>
                                    <p className="mt-4 text-white/65 text-[13.5px] max-w-[320px] leading-relaxed">
                                        Inicia sesión para ver precios exclusivos, guardar cotizaciones y hacer
                                        seguimiento a tus pedidos en tiempo real.
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-10 space-y-2.5">
                                {[
                                    ['Precios mayoristas', 'personalizados'],
                                    ['Historial completo', 'de cotizaciones'],
                                    ['Seguimiento', 'en vivo de pedidos'],
                                ].map(([a, b]) => (
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

                            <div className="relative pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-white/55">
                                    <Icon name="shield" className="h-3 w-3" /> CONEXIÓN SEGURA · SSL
                                </div>
                                <div className="font-mono text-[9.5px] tracking-[0.2em] text-white/45">
                                    v · {new Date().getFullYear()}
                                </div>
                            </div>
                        </div>

                        {/* Form panel */}
                        <div className="relative p-7 sm:p-10 lg:p-12 flex flex-col">
                            <Button
                                type="button"
                                onClick={handleClose}
                                className="absolute top-5 right-5 size-9 grid place-items-center rounded-full bg-yp-paper hover:bg-yp-line/60 text-yp-muted hover:text-yp-deep transition"
                                aria-label="Cerrar"
                            >
                                <Icon name="close" className="h-4 w-4" />
                            </Button>

                            <div className="font-mono text-[10.5px] tracking-[0.3em] text-yp-bright mb-2">
                                INICIAR SESIÓN
                            </div>
                            <h1 className="font-display font-black text-[28px] sm:text-[34px] leading-[1.02] tracking-tight text-yp-deep">
                                Bienvenido<br />de vuelta.
                            </h1>
                            <p className="mt-3 text-[13.5px] text-yp-muted max-w-[380px]">
                                Accede para cotizar tu producto, ver precios y administrar tus pedidos.
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-3.5">
                                <Field
                                    id="username"
                                    label="Nombre de usuario o correo"
                                    iconName="at"
                                    value={username}
                                    onChange={(v) => setValue('username', v, { shouldValidate: true })}
                                    error={errors.username?.message}
                                    maxLen={MAX_USER}
                                    showCounter={username.length > 0}
                                />

                                <Field
                                    id="password"
                                    label="Contraseña"
                                    type={showPass ? 'text' : 'password'}
                                    iconName="lock"
                                    value={password}
                                    onChange={(v) => setValue('password', v, { shouldValidate: true })}
                                    error={errors.password?.message}
                                    maxLen={MAX_PASS}
                                    showCounter={password.length > 0}
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

                                {password.length > 0 && (
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

                                <div className="flex items-center justify-between pt-2">
                                    <Button
                                        type="button"
                                        onClick={() => setValue('rememberme', !remember)}
                                        className="flex items-center gap-2.5 group"
                                    >
                                        <span
                                            className={`size-[18px] rounded-[5px] border-[1.5px] grid place-items-center transition ${
                                                remember ? 'bg-yp-deep border-yp-deep' : 'border-yp-line group-hover:border-yp-bright'
                                            }`}
                                        >
                                            {remember && <Icon name="check" className="h-2.5 w-2.5 text-accent" />}
                                        </span>
                                        <span className="text-[12.5px] font-semibold text-yp-ink">Recuérdame</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleRecover}
                                        className="text-[12px] font-semibold text-yp-bright hover:text-yp-deep border-b border-yp-bright/30 hover:border-yp-deep pb-0.5"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Button>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full mt-3 group relative overflow-hidden bg-yp-deep hover:bg-yp-mid disabled:opacity-80 text-white font-bold text-[13px] tracking-[0.12em] uppercase py-4 rounded-2xl transition flex items-center justify-center gap-2.5"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
                                                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                            Verificando…
                                        </>
                                    ) : (
                                        <>
                                            Ingresar
                                            <span className="size-7 rounded-full bg-accent text-yp-deep grid place-items-center group-hover:translate-x-0.5 transition">
                                                <Icon name="arrowRight" className="h-3 w-3" />
                                            </span>
                                        </>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-yp-line" />
                                <div className="font-mono text-[10px] tracking-[0.25em] text-yp-muted">¿NO TIENES CUENTA?</div>
                                <div className="h-px flex-1 bg-yp-line" />
                            </div>

                            <Button
                                type="button"
                                onClick={handleOpenRegister}
                                className="mt-4 w-full bg-yp-paper hover:bg-yp-line/40 border border-yp-line hover:border-yp-deep/30 text-yp-deep font-bold text-[12.5px] tracking-[0.12em] uppercase py-3.5 rounded-2xl transition flex items-center justify-center gap-2"
                            >
                                <Icon name="user" className="h-3.5 w-3.5" />
                                Crear una cuenta
                            </Button>

                            <div className="mt-6 text-center text-[11px] text-yp-muted leading-relaxed">
                                Al continuar aceptas nuestros{' '}
                                <a href="/aviso-legal" className="text-yp-bright hover:text-yp-deep underline">
                                    Términos
                                </a>{' '}
                                y{' '}
                                <a href="/politicas-privacidad" className="text-yp-bright hover:text-yp-deep underline">
                                    Política de Privacidad
                                </a>
                                .
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-root') || document.body);
};

export default LoginModal;
