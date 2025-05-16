import RegisterUser from "../types/RegisterUser";
import {API_ENDPOINTS} from "../api/endpoints";
import apiClient from "../api/axios";
import { RecoverPassword } from "../types/RecoverPassword";
import { ChangePassword } from "../types/ChangePassword";
import { ActiveRegularAccount } from "../types/ActiveRegularAccount";
import { UpdateUser } from "../types/UpdateUser";
import { User } from "../types/User";

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
    const response = await apiClient.post(API_ENDPOINTS.user.changePassword, changePassword); 
    return response.data;
}

const activeRegularAccount = async(activeRegularAccount: ActiveRegularAccount): Promise<string> => {
    const response = await apiClient.put(API_ENDPOINTS.user.activeRegularAccount, activeRegularAccount);
    return response.data;
};

const getUserProfile = async (): Promise<User> => {
    const response = await apiClient.get(API_ENDPOINTS.user.getUserProfile);
    return response.data;
}

const updateUserProfile = async (updateUser: UpdateUser): Promise<string> => {
    const response = await apiClient.put(API_ENDPOINTS.user.updateUserProfile, updateUser);
    return response.data;
}

export const serviceUser = {
    registerUser,
    recoverPassword,
    changePassword,
    activeRegularAccount,
    getUserProfile,
    updateUserProfile,
};