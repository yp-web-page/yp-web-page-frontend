const baseUrl =
  import.meta.env.VITE_REACT_APP_BASE_URL && import.meta.env.VITE_REACT_APP_API_VERSION
    ? `${import.meta.env.VITE_REACT_APP_BASE_URL}${import.meta.env.VITE_REACT_APP_API_VERSION}`
    : "http://localhost:8080/api/v1";

// Public storefront API exposed by the ERP. Products, categories and the hero
// banners are served from here; everything else (auth, user, quotation, email)
// stays on the legacy backend (`baseURL`).
const erpBaseUrl =
  import.meta.env.VITE_REACT_APP_ERP_BASE_URL ||
  "https://yancapublicidad.fabricabinaria.com/api/storefront/v1";

export const config = {
    baseURL: baseUrl,
    erpBaseURL: erpBaseUrl,
};
