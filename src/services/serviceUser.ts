import RegisterUser from "../types/RegisterUser";
import {API_ENDPOINTS} from "../api/endpoints";
import apiClient from "../api/axios";
import { RecoverPassword } from "../types/RecoverPassword";
import { ChangePassword } from "../types/ChangePassword";

const registerUser = async ({ user, file }: {user: RegisterUser, file?: File}): Promise<string> => {
    const formData = new FormData();

    const userBlob = new Blob([JSON.stringify(user)], {
        type: "application/json",       
    });
    formData.append("user", userBlob);
    
    if (file) {
        formData.append("file", file);
    }
    
    const response = await apiClient.post(API_ENDPOINTS.user.registerUser, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

const recoverPassword = async(recoverPassword: RecoverPassword): Promise<string> => {
    const response = await apiClient.post(API_ENDPOINTS.user.recoverPassword, recoverPassword);
    return response.data;
}

const changePassword = async(changePassword: ChangePassword): Promise<string> => { 
    const response = await apiClient.post(API_ENDPOINTS.user.ChangePassword, changePassword); 
    return response.data;
}

export const serviceUser = {
    registerUser,
    recoverPassword,
    changePassword,
};