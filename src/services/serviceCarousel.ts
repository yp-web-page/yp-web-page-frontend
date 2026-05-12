import apiClient from '../api/axios';
import { API_ENDPOINTS } from '../api/endpoints';
import { GetCarouselImages } from '../types/GetCarouselImages';

const fetchCarouselImages = async (): Promise<GetCarouselImages> => {
    const response = await apiClient.get(API_ENDPOINTS.carousel.getCarouselImages);
    return response.data;
};

export const serviceCarousel = {
    fetchCarouselImages,
};
