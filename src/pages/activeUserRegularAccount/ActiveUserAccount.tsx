import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import erpClient from '../../api/erpClient';

type TokenStatus = 'pending' | 'already_verified' | 'not_found' | 'expired';

type ActivationStatus = 'loading' | 'pending' | 'expired' | 'verifying' | 'success' | 'error';
type ResendStatus = 'idle' | 'sending' | 'sent' | 'already_verified' | 'too_many' | 'error';

const ActiveUserAccount: React.FC = () => {
    const navigate = useNavigate();
    const token = useMemo(() => new URLSearchParams(window.location.search).get('token') || '', []);
    const [activationStatus, setActivationStatus] = useState<ActivationStatus>(token ? 'loading' : 'expired');
    const [resendStatus, setResendStatus] = useState<ResendStatus>('idle');

    // Listen for cross-tab verification signal — immediate, no refetch wait.
    useEffect(() => {
        if (!token) return;
        const handler = (event: StorageEvent) => {
            if (event.key === 'yanca_email_verified' && event.newValue === token) {
                navigate('/', { replace: true });
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, [token, navigate]);

    // Load token info from server — email resolved server-side, never from the URL.
    const { data: tokenInfo } = useQuery({
        queryKey: ['activation-info', token],
        queryFn: async () => {
            const res = await erpClient.get<{
                status: TokenStatus;
                maskedEmail?: string;
            }>(`/customers/activation-info?token=${encodeURIComponent(token)}`);
            return res.data;
        },
        enabled: !!token,
        refetchOnWindowFocus: true,
        refetchInterval: 30_000,
        gcTime: 0,
    });

    useEffect(() => {
        if (!tokenInfo) return;
        if (tokenInfo.status === 'already_verified' || tokenInfo.status === 'not_found') {
            navigate('/', { replace: true });
            return;
        }
        if (tokenInfo.status === 'expired') setActivationStatus('expired');
        else setActivationStatus('pending');
    }, [tokenInfo, navigate]);

    const handleConfirm = useCallback(() => {
        setActivationStatus('verifying');
        erpClient
            .get(`/customers/verify-email?token=${encodeURIComponent(token)}`)
            .then(() => {
                // Signal other tabs that this token was verified.
                localStorage.setItem('yanca_email_verified', token);
                setActivationStatus('success');
            })
            .catch(() => setActivationStatus('error'));
    }, [token]);

    const handleResend = useCallback(() => {
        setResendStatus('sending');
        erpClient
            .post<{ message: string }>('/customers/resend-by-token', { token })
            .then((res) => {
                setResendStatus(res.data.message === 'already_verified' ? 'already_verified' : 'sent');
            })
            .catch((err: AxiosError) => {
                setResendStatus(err.response?.status === 429 ? 'too_many' : 'error');
            });
    }, [token]);

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

                {activationStatus === 'loading' && (
                    <p className="text-sm mt-6 text-center text-gray-400">Verificando enlace...</p>
                )}

                {activationStatus === 'pending' && (
                    <>
                        <p className="text-sm md:text-base mt-6 text-center">
                            Estás activando la cuenta asociada a{' '}
                            <strong>{tokenInfo?.maskedEmail}</strong>.
                            Haz clic en el botón para completar el proceso.
                        </p>
                        <button type="button" onClick={handleConfirm}
                            className="w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient text-white">
                            Activar cuenta
                        </button>
                        <p className="text-xs md:text-sm mt-6 max-w-sm text-center">
                            Si no creaste esta cuenta, ignora este mensaje.
                        </p>
                    </>
                )}

                {activationStatus === 'verifying' && (
                    <p className="text-sm mt-6 text-center">Verificando tu cuenta...</p>
                )}

                {activationStatus === 'success' && (
                    <>
                        <p className="text-sm md:text-base mt-6 text-center text-green-600 font-semibold">
                            ✓ Tu cuenta está activada. Ya puedes iniciar sesión.
                        </p>
                        <button type="button" onClick={() => navigate('/')}
                            className="w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient text-white">
                            Ir al inicio
                        </button>
                    </>
                )}

                {(activationStatus === 'error' || activationStatus === 'expired') && (
                    <>
                        <p className="text-sm md:text-base mt-6 text-center text-red-500 font-semibold">
                            {activationStatus === 'expired'
                                ? 'El enlace ha expirado o ya fue utilizado.'
                                : 'No se pudo activar la cuenta. El enlace puede haber expirado.'}
                        </p>
                        {resendStatus === 'sent' && (
                            <p className="text-sm mt-4 text-center text-green-600 font-semibold">
                                ¡Nuevo enlace enviado! Revisa tu correo y carpeta de spam.
                            </p>
                        )}
                        {resendStatus === 'already_verified' && (
                            <p className="text-sm mt-4 text-center text-green-600 font-semibold">
                                ✓ Tu cuenta ya está activada. Puedes iniciar sesión.
                            </p>
                        )}
                        {resendStatus === 'too_many' && (
                            <p className="text-sm mt-4 text-center text-orange-500">
                                Demasiados intentos. Espera una hora antes de intentarlo de nuevo.
                            </p>
                        )}
                        {resendStatus === 'error' && (
                            <p className="text-sm mt-4 text-center text-red-500">
                                No se pudo enviar. Intenta de nuevo más tarde.
                            </p>
                        )}
                        {token && resendStatus === 'idle' && (
                            <button type="button" onClick={handleResend}
                                className="w-full sm:w-[60%] md:w-[30%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-6 blue-deep-gradient text-white">
                                Reenviar correo de activación
                            </button>
                        )}
                        <button type="button" onClick={() => navigate('/')}
                            className="text-sm text-blue-500 underline mt-6">
                            Volver al inicio
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActiveUserAccount;
