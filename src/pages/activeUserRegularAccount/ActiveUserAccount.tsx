import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import erpClient from '../../api/erpClient';

type Status = 'pending' | 'verifying' | 'success' | 'error' | 'missing_token';
type ResendStatus = 'idle' | 'sending' | 'sent' | 'error' | 'too_many';

interface ResendFormInputs {
    email: string;
}

const ActiveUserAccount: React.FC = () => {
    const navigate = useNavigate();
    const token = useMemo(() => new URLSearchParams(window.location.search).get('token') || '', []);
    const [status, setStatus] = useState<Status>(token ? 'pending' : 'missing_token');
    const [resendStatus, setResendStatus] = useState<ResendStatus>('idle');

    const { register, handleSubmit, formState: { errors } } = useForm<ResendFormInputs>();

    const handleConfirm = useCallback(() => {
        setStatus('verifying');
        erpClient
            .get(`/customers/verify-email?token=${encodeURIComponent(token)}`)
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'));
    }, [token]);

    const handleResend = useCallback((data: ResendFormInputs) => {
        setResendStatus('sending');
        erpClient
            .post('/customers/resend-verification', { email: data.email })
            .then(() => setResendStatus('sent'))
            .catch((err) => {
                setResendStatus(err.response?.status === 429 ? 'too_many' : 'error');
            });
    }, []);

    const showResend = status === 'error' || status === 'missing_token';

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div
                className="hidden md:flex md:w-1/2 bg-cover bg-center bg-gradient-to-b from-[#4da0ff] to-[#002f7f] justify-center items-center"
                style={{ backgroundImage: "url('/change_password_icon.jpg')" }}
            />
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-indigo-50 text-xs text-gray-500">
                <img src="/logo_favicon.png" alt="Logo" className="h-16 mb-6" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-500 text-center leading-tight max-w-[90%]">
                    Activación de cuenta
                </h2>

                {status === 'pending' && (
                    <>
                        <p className="text-sm md:text-base mt-6 text-center">
                            Estás a un paso de activar tu cuenta. Haz clic para completar el proceso.
                        </p>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient text-white"
                        >
                            Activar cuenta
                        </button>
                        <p className="text-xs md:text-sm mt-6 max-w-sm text-center">
                            Si no creaste esta cuenta, ignora este mensaje.
                        </p>
                    </>
                )}

                {status === 'verifying' && (
                    <p className="text-sm md:text-base mt-6 text-center">Verificando tu cuenta...</p>
                )}

                {status === 'success' && (
                    <>
                        <p className="text-sm md:text-base mt-6 text-center text-green-600 font-semibold">
                            ¡Tu cuenta ha sido activada exitosamente! 🎉
                        </p>
                        <p className="text-sm mt-2 text-center">
                            Ya puedes iniciar sesión con tu correo y contraseña.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient text-white"
                        >
                            Ir al inicio
                        </button>
                    </>
                )}

                {showResend && (
                    <>
                        <p className="text-sm md:text-base mt-6 text-center text-red-500 font-semibold">
                            {status === 'missing_token'
                                ? 'El enlace de activación no es válido.'
                                : 'El enlace ha expirado o ya fue utilizado.'}
                        </p>

                        {resendStatus === 'sent' ? (
                            <p className="text-sm mt-6 text-center text-green-600 font-semibold">
                                ¡Correo enviado! Revisa tu bandeja de entrada y spam.
                            </p>
                        ) : (
                            <>
                                <p className="text-sm mt-4 text-center text-gray-500">
                                    ¿Necesitas un nuevo enlace? Ingresa tu correo:
                                </p>
                                <form
                                    onSubmit={handleSubmit(handleResend)}
                                    className="w-full sm:w-[60%] md:w-[40%] mx-auto mt-4 flex flex-col gap-3"
                                >
                                    <input
                                        type="email"
                                        placeholder="tu@correo.com"
                                        {...register('email', {
                                            required: 'El correo es requerido',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Correo inválido',
                                            },
                                        })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-full text-sm outline-none focus:border-blue-500"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 text-center">{errors.email.message}</p>
                                    )}
                                    {resendStatus === 'too_many' && (
                                        <p className="text-xs text-orange-500 text-center">
                                            Demasiados intentos. Espera una hora antes de intentarlo de nuevo.
                                        </p>
                                    )}
                                    {resendStatus === 'error' && (
                                        <p className="text-xs text-red-500 text-center">
                                            No se pudo enviar el correo. Intenta de nuevo.
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={resendStatus === 'sending'}
                                        className="w-full py-2.5 rounded-full font-bold text-sm blue-deep-gradient text-white disabled:opacity-60"
                                    >
                                        {resendStatus === 'sending' ? 'Enviando...' : 'Reenviar correo de activación'}
                                    </button>
                                </form>
                            </>
                        )}

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-sm text-blue-500 underline mt-6"
                        >
                            Volver al inicio
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActiveUserAccount;
