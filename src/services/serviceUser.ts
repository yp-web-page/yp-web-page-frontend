import RegisterUser from "../types/RegisterUser";
import {API_ENDPOINTS} from "../api/endpoints";
import apiClient from "../api/axios";

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

export const serviceUser = {
    registerUser,
};