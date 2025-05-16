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

// Add a request interceptor to include the token in the headers
// This interceptor will run before every request
// It checks if the token is present in localStorage and adds it to the headers
// This is useful for authenticated requests
// If the token is not present, the request will still go through without the Authorization header
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

// Add a response interceptor to handle errors globally
// This interceptor will run after every response
// It checks if the response status is 401 or 403 and dispatches a custom event
// This is useful for handling unauthorized access and forbidden access globally
// The custom event can be listened for in the AuthProvider to handle logout or show a notification
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Create a custom event for unauthorized access, this event can be listened for our AuthProvider.
            window.dispatchEvent(new Event("unauthorized"));
        }

        if (error.response?.status === 403) {
            // Create a custom event for forbidden access, this event can be listened for our AuthProvider.
            window.dispatchEvent(new Event("forbidden"));
          }

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