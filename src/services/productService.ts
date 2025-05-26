import { ResponseFeaturedProducts, Product } from "../types/ProductTypes"
import { API_ENDPOINTS } from "../api/endpoints"
import apiClient from "../api/axios"

const getFeaturedProducts = async (): Promise<ResponseFeaturedProducts> => {
    const response = await apiClient.get(API_ENDPOINTS.products.featuredProducts)
    return response.data as ResponseFeaturedProducts
}

const getProductById = async (productId: string): Promise<Product> => {
    const response = await apiClient.get(API_ENDPOINTS.products.productById.replace(':id', productId))
    return response.data as Product
}

export const productService = {
    getFeaturedProducts,
    getProductById
}