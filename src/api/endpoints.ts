export const API_ENDPOINTS = {
    carousel: {
        getCarouselImages: '/carousel/images',
    },
    user: {
        registerUser: '/user/register',
        recoverPassword: '/user/recover-password',
        loginUser: '/auth/login',
        changePassword: '/user/change-password',
        activeRegularAccount: '/user/active-account',
        getUserProfile: '/user/profile',
        updateUserProfile: '/user/profile/update',
    },
    inventories: {
        getInventoriesInfo: '/inventories/all/info',
        getFavoriteInventoriesInfo: '/inventories/favorite/info',
        getInventoryViewById: '/inventories/:id',
    },
    email: {
        resendActivationEmail: '/email/resend-activation',
        sendEmailQuotation: '/email/quotation',
    },
    products: {
        featuredProducts: '/products/featured',
        productById: 'products/:id',
        getProductPrices: '/products/prices',
    },
    lists: {
        getListViewById: '/lists/:id',
    },
    quotation: {
        addProductToQuotation: '/quotation',
        getAllQuotations: '/quotation/:username',
        deleteQuotation: '/quotation/:quotationId',
        generatePdfQuotation: '/quotation/:quotationId/pdf',
    }
};
