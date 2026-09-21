import customerClient from '../api/customerClient';
import erpClient from '../api/erpClient';

export interface RegisterCustomerParams {
    name: string;
    email: string;
    password: string;
    phone?: string;
    type?: 'person' | 'company';
    segment: 'retail' | 'wholesale';
}

export interface CustomerAddress {
    street?: string;
    city?: string;
    department?: string;
}

export interface CustomerProfile {
    id: string;
    name: string;
    type: string;
    segment: string | null;
    taxId: string | null;
    documentType: string | null;
    email: string | null;
    phone: string | null;
    address: CustomerAddress;
    invoicingEmail: string | null;
    fiscalRegime: string | null;
    fiscalResponsibilities: string[] | null;
    emailVerified: boolean;
    profileComplete: boolean;
    rutVerified: boolean;
    rutAttemptsLeft: number;
}

export type UpdateCustomerProfileParams = Partial<Pick<CustomerProfile,
    'name' | 'type' | 'taxId' | 'documentType' | 'phone' | 'address' |
    'invoicingEmail' | 'fiscalRegime' | 'fiscalResponsibilities'
>>;

const registerCustomer = async (params: RegisterCustomerParams): Promise<void> => {
    await erpClient.post('/customers/register', {
        name: params.name,
        email: params.email,
        password: params.password,
        segment: params.segment,
        ...(params.phone ? { phone: params.phone } : {}),
        ...(params.type ? { type: params.type } : {}),
    });
};

const loginCustomer = async (email: string, password: string): Promise<void> => {
    // The server sets an httpOnly cookie — nothing to extract or store here.
    await erpClient.post('/customers/login', { email, password }, { withCredentials: true });
};

const logoutCustomer = async (): Promise<void> => {
    // Server clears the httpOnly cookie; ignore 401 (session already gone).
    await customerClient.post('/customers/logout').catch(() => {});
};

const getCustomerProfile = async (): Promise<CustomerProfile> => {
    const response = await customerClient.get<CustomerProfile>('/customers/me');
    return response.data;
};

const updateCustomerProfile = async (params: UpdateCustomerProfileParams): Promise<CustomerProfile> => {
    const response = await customerClient.patch<CustomerProfile>('/customers/profile', params);
    return response.data;
};

const resendVerificationEmail = async (email: string): Promise<string> => {
    const response = await erpClient.post<{ message: string }>('/customers/resend-verification', { email });
    return response.data.message;
};

type RutCode = 'not_a_rut' | 'file_too_large' | 'file_type_not_allowed' | 'unreadable_pdf' | 'model_unavailable' | 'not_configured';

type RutValidationResult =
    | { valid: true; skipped?: boolean }
    | { valid: false; code: RutCode };

type RutSubmitResult =
    | { valid: true; alreadyVerified?: boolean; attemptsLeft: number }
    | { valid: false; code: RutCode; attemptsLeft: number; disabled: boolean };

const validateRut = async (file: File, signal?: AbortSignal): Promise<RutValidationResult> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await erpClient.post<RutValidationResult>(
        '/customers/validate-rut',
        formData,
        { headers: { 'Content-Type': undefined }, signal },
    );
    return response.data;
};

const deleteRut = async (): Promise<void> => {
    await customerClient.delete('/customers/rut');
};

const submitRut = async (file: File, signal?: AbortSignal): Promise<RutSubmitResult> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await customerClient.post<RutSubmitResult>(
        '/customers/submit-rut',
        formData,
        // LLM validation can take up to 30s — override the default 10s client timeout.
        { headers: { 'Content-Type': undefined }, signal, timeout: 45_000 },
    );
    return response.data;
};

export type { RutValidationResult, RutSubmitResult };

export const serviceCustomer = {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomerProfile,
    updateCustomerProfile,
    resendVerificationEmail,
    validateRut,
    submitRut,
    deleteRut,
};
