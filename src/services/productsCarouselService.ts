import apiClient from "../api/axios"
import { GetProductsCarouselInfo } from "../types/GetProductsCarouselInfo"
import { API_ENDPOINTS } from "../api/endpoints"

const getProductsCarousel = async (): Promise<GetProductsCarouselInfo[]> => {
    try {
        const response = await apiClient.get<GetProductsCarouselInfo[]>(
            API_ENDPOINTS.products.getProductsCarouselInfo
        )
        return response.data
    } catch (error) {
        console.error("Error fetching products carousel:", error)
        throw error
    }
}

export { getProductsCarousel }