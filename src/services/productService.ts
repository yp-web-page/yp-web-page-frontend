import { ResponseFeaturedProducts, Product, PaginatedResponse, ProductCard } from "../types/ProductTypes"
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

const searchProductsByName = async (query: string, page: number = 0, size: number = 5): Promise<PaginatedResponse<ProductCard>> => {
    const response = await apiClient.get(API_ENDPOINTS.products.searchByName, {
        params: {
            query,
            page,
            size
        }
    })
    return response.data as PaginatedResponse<ProductCard>
}

export const productService = {
    getFeaturedProducts,
    getProductById,
    searchProductsByName
}