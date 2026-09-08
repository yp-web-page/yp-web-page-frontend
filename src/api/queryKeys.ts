export const QUERY_KEYS = {
    carousel: {
        // 'v2': the carousel now comes from the ERP's /banners. The suffix
        // invalidates the entry a returning visitor still has in localStorage
        // from the retired backend (persisted for up to 6 h in main.tsx).
        // queryKey[0] stays 'carousel-images' so the persistence allow-list
        // there keeps matching.
        images: ['carousel-images', 'v2'] as [string, string],
    },
    inventories: {
        info: ['inventories-info'] as [string],
        allInventories: ['inventories-all'] as [string],
        view: ['inventories-view'] as [string]
    },
    user: {
        getUserProfile: ['user-profile'] as [string],
        updateUserProfile: ['user-profile-update'] as [string],
    },
    products: {
        featured: ['featured-products'] as [string],
        byId: ['product-by-id'] as [string],
        search: ['products-search'] as [string],
        filter: ['products-filter'] as [string],
    },
    lists: {
        view: ['lists-view'] as [string]
    },
    quotations: {
        getAllQuotation: ['all-quotations'] as [string],
    }
};