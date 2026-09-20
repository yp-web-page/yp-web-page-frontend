import customerClient from '../api/customerClient';
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

const resendVerificationEmail = async (email: string): Promise<string> => {
    const response = await erpClient.post<{ message: string }>('/customers/resend-verification', { email });
    return response.data.message;
};

export const serviceCustomer = {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomerProfile,
    resendVerificationEmail,
};
