import apiClient from "../api/axios";
import { GetCarouselImages } from "../types/GetCarouselImages";
import { API_ENDPOINTS } from "../api/endpoints";

const fetchCarouselImages = async (): Promise<GetCarouselImages> => {
    const response = await apiClient.get(API_ENDPOINTS.carousel.getCarouselImages);
    return response.data;
}

export const serviceCarousel = {
    fetchCarouselImages,
};