import {
    ResponseFeaturedProducts,
    Product,
    PaginatedResponse,
    ProductCard,
    ProductFilterRequest,
    ResponseSearchedProducts,
    GetPricesRequest,
    PrintingProductPricesResponse,
} from "../types/ProductTypes"
import { API_ENDPOINTS } from "../api/endpoints"
import apiClient from "../api/axios"
import erpClient from "../api/erpClient"
import {
    ErpPage,
    ErpProductCard,
    ErpProductDetail,
    mapFeatured,
    mapSearched,
    mapProductDetail,
    toPaginatedResponse,
} from "../api/erpMappers"

// Products come from the ERP storefront API. featured / search / filter all map
// onto the single consolidated GET /products endpoint with query params.

const getFeaturedProducts = async (): Promise<ResponseFeaturedProducts> => {
    const response = await erpClient.get<ErpPage<ErpProductCard>>("/products", {
        params: { featured: true, pageSize: 20 },
    })
    return { products: mapFeatured(response.data.items) }
}

const getProductById = async (productId: string): Promise<Product> => {
    const response = await erpClient.get<ErpProductDetail>(`/products/${productId}`)
    return mapProductDetail(response.data)
}

const searchProductsByName = async (query: string): Promise<ResponseSearchedProducts> => {
    const response = await erpClient.get<ErpPage<ErpProductCard>>("/products", {
        params: { q: query, pageSize: 20 },
    })
    return { content: mapSearched(response.data.items) }
}

const filterProducts = async (
    filter: ProductFilterRequest,
    page: number = 0,
    size: number = 10,
): Promise<PaginatedResponse<ProductCard>> => {
    const response = await erpClient.get<ErpPage<ErpProductCard>>("/products", {
        params: {
            page,
            pageSize: size,
            q: filter.name || undefined,
            categoryId: filter.listId || undefined,
            featured: filter.featured || undefined,
            material: filter.material || undefined,
            size: filter.size || undefined,
            minPrice: filter.minPrice ?? undefined,
            maxPrice: filter.maxPrice ?? undefined,
            personalizable: filter.printPersonalizable || undefined,
        },
    })
    return toPaginatedResponse(response.data)
}

/**
 * Wholesaler quantity-tiered pricing. Still served by the legacy backend and
 * currently not invoked from the UI (prices + quotation are hidden until the
 * ERP exposes its own pricing endpoint).
 */
const getProductPrices = async (
    getPricesRequest: GetPricesRequest,
): Promise<PrintingProductPricesResponse> => {
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
