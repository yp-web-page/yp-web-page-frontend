import { ResponseFeaturedProducts } from "../types/ProductTypes"
import { API_ENDPOINTS } from "../api/endpoints"
import apiClient from "../api/axios"

const getFeaturedProducts = async (): Promise<ResponseFeaturedProducts[]> => {
    const response = await apiClient.get(API_ENDPOINTS.products.featuredProducts)
    return response.data as ResponseFeaturedProducts[]
}

export const productService = {
    getFeaturedProducts 
}