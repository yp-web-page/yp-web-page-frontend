import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiClient from "../api/axios";
import { GetCarouselImages } from "../types/GetCarouselImages";
import { API_ENDPOINTS } from "../api/endpoints";
import { QUERY_KEYS } from "../api/queryKeys";

const fetchCarouselImages = async (): Promise<GetCarouselImages> => {
    const response = await apiClient.get(API_ENDPOINTS.carousel.getCarouselImages);
    return response.data;
}

export const useCarouselImages = (): UseQueryResult<GetCarouselImages, Error> => {
    return useQuery<GetCarouselImages, Error, GetCarouselImages, [string]>({
        queryKey: QUERY_KEYS.carousel.images,
        queryFn: fetchCarouselImages,
        staleTime: 1000 * 60 * 60 * 6,
        gcTime: 1000 * 60 * 60 * 6,
    });
}