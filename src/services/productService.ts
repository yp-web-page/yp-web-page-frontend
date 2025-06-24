import { ResponseFeaturedProducts, Product, GetPricesRequest, PrintingProductPricesResponse } from "../types/ProductTypes"
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

const getProductPrices = async (getPricesRequest: GetPricesRequest): Promise<PrintingProductPricesResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.products.getProductPrices, getPricesRequest);
    return response.data;
}

export const productService = {
    getFeaturedProducts,
    getProductById,
    getProductPrices,
}