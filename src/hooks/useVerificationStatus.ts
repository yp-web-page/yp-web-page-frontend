import { useQuery } from '@tanstack/react-query';
import erpClient from '../api/erpClient';

const useVerificationStatus = (email: string) => {
    return useQuery({
        queryKey: ['verification-status', email],
        queryFn: async () => {
            const response = await erpClient.get<{ verified: boolean }>(
                `/customers/verification-status?email=${encodeURIComponent(email)}`,
            );
            return response.data.verified;
        },
        enabled: !!email,
        // Re-check when the tab regains focus — catches cross-tab verifications.
        refetchOnWindowFocus: true,
        // Poll every 30s as a fallback for tabs that stay in the background.
        refetchInterval: 30_000,
        staleTime: 10_000,
    });
};

export default useVerificationStatus;
