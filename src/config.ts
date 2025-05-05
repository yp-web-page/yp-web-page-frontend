const baseUrl =
  import.meta.env.VITE_REACT_APP_BASE_URL && import.meta.env.VITE_REACT_APP_API_VERSION
    ? `${import.meta.env.VITE_REACT_APP_BASE_URL}${import.meta.env.VITE_REACT_APP_API_VERSION}`
    : "http://localhost:8080/api/v1";

export const config = {
    baseURL: baseUrl,
};