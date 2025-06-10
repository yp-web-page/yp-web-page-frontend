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
    },
    products: {
        featuredProducts: '/products/featured',
        productById: 'products/:id'
    },
    lists: {
        getListViewById: '/lists/:id',
    }
};
