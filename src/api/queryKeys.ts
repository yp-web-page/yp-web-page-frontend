export const QUERY_KEYS = {
    carousel: {
        images: ['carousel-images'] as [string],
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
    },
    lists: {
        view: ['lists-view'] as [string]
    },
    quotations: {
        getAllQuotation: ['all-quotations'] as [string],
    }
};