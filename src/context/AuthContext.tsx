import { useEffect } from 'react';
import { useModal } from './ModalContext';
import { useAuthStore } from '../store/authStore';

/**
 * Initializes the auth store on app mount by reading the token from localStorage.
 * Must be rendered once at the top of the tree (main.tsx).
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const init = useAuthStore((s) => s.init);
    const startCrossTabSync = useAuthStore((s) => s.startCrossTabSync);
    const { openModal } = useModal();

    useEffect(() => {
        init();
        // Returns cleanup — removes the storage listener on unmount.
        // This prevents duplicate listeners in React StrictMode (double-invoke).
        return startCrossTabSync();
    }, []);

    useEffect(() => {
        // Legacy: dispatched by src/api/axios.ts when the Java backend returns 403.
        // Remove when the Java backend is fully replaced by the ERP.
        const handleForbidden = () =>
            openModal('notification', 'No tienes permisos para acceder a este recurso.', 'error');

        window.addEventListener('forbidden', handleForbidden);
        return () => window.removeEventListener('forbidden', handleForbidden);
    }, []);

    return <>{children}</>;
};
