export const MUTATION_KEYS = {
    user: {
        recoverPassword: ['recover-password'] as [string],
        registerUser: ['register-user'] as [string],
        changePassword: ['change-password'] as [string],
        activeRegularAccount: ['active-regular-account'] as [string],
    },
    email: {
        resendActivationEmail: ['resend-activation-email'] as [string],
        sendEmailQuotation: ['send-email-quotation'] as [string],
    },
    product: {
        getProductPrices: ['get-product-prices'] as [string],
    },
    quotation: {
        addProductToQuotation: ['add-product-quotation'] as [string],
        deleteQuotation: ['delete-quotation'] as [string],
        generatePdfQuotation: ['generate-pdf-quotation'] as [string],
    }
}