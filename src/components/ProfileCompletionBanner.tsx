import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { serviceCustomer } from '../services/serviceCustomer';
import Icon from './icon/Icon';

const ProfileCompletionBanner: React.FC = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
    const { pathname } = useLocation();

    const { data: profile } = useQuery({
        queryKey: ['customer-profile'],
        queryFn: serviceCustomer.getCustomerProfile,
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (pathname === '/perfil') return null;
    if (!isAuthenticated || isAuthLoading || !profile) return null;
    if (!profile.emailVerified) return null;

    const missingFields = !profile.profileComplete;
    const needsRut = profile.segment === 'wholesale' && !profile.rutVerified;

    if (!missingFields && !needsRut) return null;

    const title = needsRut && !missingFields
        ? 'RUT pendiente de verificación'
        : 'Perfil incompleto';

    const message = missingFields && needsRut
        ? 'Completa tu información fiscal y verifica tu RUT para operar como publicista.'
        : needsRut
        ? 'Como publicista debes verificar tu RUT para acceder a todos los beneficios.'
        : 'Agrega tu tipo y número de documento para habilitar cotizaciones y facturación.';

    return (
        <div className="relative bg-yp-deep overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
                <div className="size-7 rounded-lg bg-accent/15 grid place-items-center text-accent shrink-0">
                    <Icon name="warning" className="h-3.5 w-3.5" />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-semibold text-white leading-snug">
                        {title}
                    </p>
                    <p className="text-[11px] text-white/55 mt-0.5 leading-snug hidden sm:block">
                        {message}
                    </p>
                </div>

                <Link
                    to="/perfil"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-deep text-yp-deep text-[12px] font-bold tracking-[0.05em] transition shrink-0"
                >
                    Completar perfil
                    <Icon name="arrowRight" className="h-3 w-3" />
                </Link>
            </div>
        </div>
    );
};

export default ProfileCompletionBanner;
