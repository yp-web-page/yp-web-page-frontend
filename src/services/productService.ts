import { ResponseFeaturedProducts, Product, PaginatedResponse, ProductCard, ProductFilterRequest, ResponseSearchedProducts, GetPricesRequest, PrintingProductPricesResponse } from "../types/ProductTypes"
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

const searchProductsByName = async (query: string): Promise<ResponseSearchedProducts> => {
    const response = await apiClient.get(API_ENDPOINTS.products.searchByName, {
        params: {
            query
        }
    })
    return response.data as ResponseSearchedProducts
}

const filterProducts = async (
    filter: ProductFilterRequest,
    page: number = 0,
    size: number = 10
): Promise<PaginatedResponse<ProductCard>> => {
    const response = await apiClient.post(API_ENDPOINTS.products.filter, filter, {
        params: {
            page,
            size
        }
    })
    return response.data as PaginatedResponse<ProductCard>
}

const getProductPrices = async (getPricesRequest: GetPricesRequest): Promise<PrintingProductPricesResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.products.getProductPrices, getPricesRequest);
    return response.data;
}

export const productService = {
    getFeaturedProducts,
    getProductById,
    searchProductsByName,
    filterProducts,
    getProductPrices,
}