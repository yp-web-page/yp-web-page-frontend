import customerClient, { setCustomerToken, clearCustomerToken } from '../api/customerClient';
import erpClient from '../api/erpClient';

export interface RegisterCustomerParams {
    name: string;
    email: string;
    password: string;
    phone?: string;
    type?: 'person' | 'company';
    segment: 'retail' | 'wholesale';
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
    await erpClient.post('/customers/register', params);
};

const loginCustomer = async (email: string, password: string): Promise<void> => {
    const response = await erpClient.post<{ token: string; expiresIn: number }>(
        '/customers/login',
        { email, password },
    );
    setCustomerToken(response.data.token);
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

export const serviceCustomer = {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCustomerProfile,
};
