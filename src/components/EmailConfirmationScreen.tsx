import React from 'react';
import { AxiosError } from 'axios';
import useResendVerification from '../hooks/useResendVerification';
import useVerificationStatus from '../hooks/useVerificationStatus';
import Button from './Button';

interface EmailConfirmationScreenProps {
    email: string;
    onClose: () => void;
    /** Extra className applied to the root div — lets callers adapt the layout. */
    className?: string;
}

const EmailConfirmationScreen: React.FC<EmailConfirmationScreenProps> = ({
    email,
    onClose,
    className = 'col-span-2 flex flex-col items-center justify-center p-10 text-center min-h-[420px]',
}) => {
    const { mutate: resend, isPending, isSuccess, isError, error, data } = useResendVerification();
    const { data: alreadyVerifiedFromPoll } = useVerificationStatus(email);
    const isTooMany = isError && error instanceof AxiosError && error.response?.status === 429;
    // Verified if: poll detected it from another tab, or the resend response said so.
    const isAlreadyVerified = alreadyVerifiedFromPoll === true || (isSuccess && data === 'already_verified');

    return (
        <div className={className}>
            <img src="/logo_favicon.png" alt="Yanca Publicidad" className="h-16 mb-6" />
            <h2 className="font-display font-black text-[28px] text-yp-deep leading-tight">
                Revisa tu correo
            </h2>
            <p className="mt-3 text-[13.5px] text-yp-muted max-w-[380px]">
                Enviamos un enlace de verificación a{' '}
                <strong className="text-yp-deep">{email}</strong>.
                Haz clic en el enlace para verificar tu cuenta.
            </p>

            {isAlreadyVerified ? (
                <div className="mt-6">
                    <p className="text-[12.5px] text-emerald-600 font-semibold">
                        ✓ Tu cuenta ya está verificada.
                    </p>
                    <p className="text-[12px] text-yp-muted mt-1">
                        Puedes iniciar sesión con tu correo y contraseña.
                    </p>
                    <Button
                        type="button"
                        onClick={onClose}
                        className="mt-4 px-6 py-2.5 rounded-full bg-yp-deep text-white font-bold text-[12.5px] transition"
                    >
                        Ir a iniciar sesión
                    </Button>
                </div>
            ) : (
                <>
                    <p className="mt-6 text-[12px] text-yp-muted">¿No lo recibiste o el enlace expiró?</p>
                    {isSuccess && data === 'sent' ? (
                        <p className="mt-2 text-[12.5px] text-emerald-600 font-semibold">
                            ¡Correo reenviado! Revisa también tu carpeta de spam.
                        </p>
                    ) : (
                        <>
                            <Button
                                type="button"
                                onClick={() => resend(email)}
                                disabled={isPending}
                                className="mt-2 px-6 py-2.5 rounded-full bg-yp-paper border border-yp-line hover:border-yp-deep/30 text-yp-deep font-bold text-[12.5px] transition disabled:opacity-60"
                            >
                                {isPending ? 'Verificando...' : 'Reenviar correo de verificación'}
                            </Button>
                            {isTooMany && (
                                <p className="mt-2 text-[11px] text-orange-500">
                                    Demasiados intentos. Espera una hora antes de intentarlo de nuevo.
                                </p>
                            )}
                            {isError && !isTooMany && (
                                <p className="mt-2 text-[11px] text-red-500">
                                    No se pudo enviar. Intenta de nuevo más tarde.
                                </p>
                            )}
                        </>
                    )}
                </>
            )}

            {!isAlreadyVerified && (
                <Button
                    type="button"
                    onClick={onClose}
                    className="mt-8 text-[12px] text-yp-muted hover:text-yp-deep underline"
                >
                    Cerrar
                </Button>
            )}
        </div>
    );
};

export default EmailConfirmationScreen;
