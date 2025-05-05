export const MUTATION_KEYS = {
    user: {
        recoverPassword: ['recover-password'] as [string],
        registerUser: ['register-user'] as [string],
        changePassword: ['change-password'] as [string],
        activeRegularAccount: ['active-regular-account'] as [string],
    },
    email: {
        resendActivationEmail: ['resend-activation-email'] as [string],
    }
}