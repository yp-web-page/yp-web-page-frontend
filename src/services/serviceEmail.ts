import apiClient from "../api/axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { ActiveRegularAccount } from "../types/ActiveRegularAccount";

const activeRegularAccount = async(activeRegularAccount: ActiveRegularAccount): Promise<string> => {
    const response = await apiClient.put(API_ENDPOINTS.email.resendActivationEmail, activeRegularAccount);
    return response.data;
};

export const serviceEmail = {
    activeRegularAccount,
};