import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Icon from '../icon/Icon';
import Button from '../Button';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type MenuItemProps = {
    iconName: string;
    label: string;
    hint?: string;
    onClick: () => void;
    danger?: boolean;
    badge?: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ iconName, label, hint, onClick, danger, badge }) => (
    <Button
        type="button"
        onClick={onClick}
        className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left ${
            danger ? 'hover:bg-red-50' : 'hover:bg-yp-paper'
        }`}
    >
        <span
            className={`size-9 rounded-xl grid place-items-center shrink-0 transition ${
                danger
                    ? 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                    : 'bg-yp-paper text-yp-bright group-hover:bg-yp-deep group-hover:text-accent'
            }`}
        >
            <Icon name={iconName} className="h-4 w-4" />
        </span>
        <span className="flex-1 min-w-0">
            <span className={`block font-display font-bold text-[13.5px] leading-tight ${danger ? 'text-red-500' : 'text-yp-deep'}`}>
                {label}
            </span>
            {hint && (
                <span className="block font-mono text-[10px] tracking-wider uppercase text-yp-muted mt-0.5">{hint}</span>
            )}
        </span>
        {badge ? (
            <span className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-accent text-yp-deep font-bold">
                {badge}
            </span>
        ) : (
            <Icon
                name="chevronRight"
                className={`h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-0.5 ${
                    danger ? 'text-red-300 group-hover:text-red-500' : 'text-yp-muted group-hover:text-yp-deep'
                }`}
            />
        )}
    </Button>
);

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const ref = useRef<HTMLDivElement>(null);

    const username = (typeof window !== 'undefined' && localStorage.getItem('rememberedUsername')) || 'Usuario';
    const initials = username.slice(0, 2).toUpperCase();

    useEffect(() => {
        if (!isOpen) return;
        const onDocClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('mousedown', onDocClick);
        document.addEventListener('keydown', onEsc);
        return () => {
            document.removeEventListener('mousedown', onDocClick);
            document.removeEventListener('keydown', onEsc);
        };
    }, [isOpen, onClose]);

    const go = (to: string) => {
        navigate(to);
        onClose();
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    const content = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                    className="fixed top-[100px] right-4 sm:right-6 z-[9999] w-[320px] bg-white rounded-2xl border border-yp-line overflow-hidden origin-top-right"
                    style={{
                        boxShadow: '0 24px 60px -16px rgba(0,31,54,0.35), 0 8px 24px -10px rgba(0,31,54,0.15)',
                    }}
                >
                    {/* Header */}
                    <div className="relative yp-gradient-radial text-white px-5 pt-5 pb-4 overflow-hidden">
                        <div className="absolute inset-0 grid-bg opacity-50" />
                        <div className="relative flex items-center gap-3">
                            <div className="size-12 rounded-2xl bg-accent grid place-items-center text-yp-deep font-display font-black text-[18px] shrink-0 ring-2 ring-white/20">
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-display font-bold text-[15px] leading-tight truncate">{username}</div>
                                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/65 mt-0.5 truncate">
                                    Mi cuenta
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1">
                                <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(93,208,154,0.6)]" />
                                <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/85 uppercase">
                                    Sesión activa
                                </span>
                            </div>
                            <div className="font-mono text-[9.5px] tracking-[0.18em] text-accent">YANCA</div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="p-2">
                        <MenuItem
                            iconName="user"
                            label="Mi perfil"
                            hint="DATOS · PREFERENCIAS"
                            onClick={() => go('/perfil')}
                        />
                        <MenuItem
                            iconName="fileText"
                            label="Mis cotizaciones"
                            hint="HISTORIAL"
                            onClick={() => go('/cotizaciones')}
                        />
                    </div>

                    <div className="mx-4 h-px bg-yp-line" />

                    <div className="p-2">
                        <MenuItem
                            iconName="logout"
                            label="Cerrar sesión"
                            hint="SALIR DE LA CUENTA"
                            danger
                            onClick={handleLogout}
                        />
                    </div>

                    <div className="px-4 py-2.5 bg-yp-paper border-t border-yp-line flex items-center justify-between">
                        <div className="font-mono text-[9.5px] tracking-[0.2em] text-yp-muted uppercase">
                            Yanca Publicidad
                        </div>
                        <div className="font-mono text-[9.5px] tracking-[0.2em] text-yp-muted">
                            v {new Date().getFullYear()}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(content, document.getElementById('modal-root') || document.body);
};

export default UserModal;
