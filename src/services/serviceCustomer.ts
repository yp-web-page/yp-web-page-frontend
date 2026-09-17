import customerClient, { setCustomerToken, clearCustomerToken } from '../api/customerClient';
import erpClient from '../api/erpClient';

export interface RegisterCustomerParams {
    name: string;
    email: string;
    password: string;
    phone?: string;
    type?: 'person' | 'company';
    segment: 'retail' | 'wholesale';
    /** Required when segment = 'wholesale'. */
    rut?: File | null;
}

export interface CustomerProfile {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    type: string;
    segment: string | null;
    address: Record<string, unknown>;
}

const registerCustomer = async (params: RegisterCustomerParams): Promise<void> => {
    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('email', params.email);
    formData.append('password', params.password);
    formData.append('segment', params.segment);
    if (params.phone) formData.append('phone', params.phone);
    if (params.type) formData.append('type', params.type);
    if (params.rut) formData.append('rut', params.rut);

    await erpClient.post('/customers/register', formData, {
        // Let the browser set Content-Type with the correct boundary for multipart/form-data.
        headers: { 'Content-Type': undefined },
    });
};

const loginCustomer = async (email: string, password: string): Promise<void> => {
    const response = await erpClient.post<{ expiresIn: number }>(
        '/customers/login',
        { email, password },
    );
    const token = response.headers['authorization']?.replace('Bearer ', '');
    if (!token) throw new Error('No authorization header in login response');
    setCustomerToken(token);
};

const logoutCustomer = async (): Promise<void> => {
    try {
        await customerClient.post('/customers/logout');
    } finally {
        clearCustomerToken();
    }
};

const getCustomerProfile = async (): Promise<CustomerProfile> => {
    const response = await customerClient.get<CustomerProfile>('/customers/me');
    return response.data;
};

const resendVerificationEmail = async (email: string): Promise<void> => {
    await erpClient.post('/customers/resend-verification', { email });
};

export const serviceCustomer = {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomerProfile,
    resendVerificationEmail,
};
