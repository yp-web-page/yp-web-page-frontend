import axios, { AxiosInstance } from "axios";
import { config } from "../config";

const baseURL = config.baseURL;

const apiClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle error response
            console.error("API Error:", error.response.data);
        } else if (error.request) {
            // Handle no response
            console.error("No response received:", error.request);
        } else {
            // Handle other errors
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;