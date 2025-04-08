import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetCarouselImages } from "../types/GetCarouselImages";
import { QUERY_KEYS } from "../api/queryKeys";
import { serviceCarousel } from "../services/serviceCarousel";

const fetchCarouselImages = serviceCarousel.fetchCarouselImages;

export const useCarouselImages = (): UseQueryResult<GetCarouselImages, Error> => {
    return useQuery<GetCarouselImages, Error, GetCarouselImages, [string]>({
        queryKey: QUERY_KEYS.carousel.images,
        queryFn: fetchCarouselImages,
        staleTime: 1000 * 60 * 60 * 6,
        gcTime: 1000 * 60 * 60 * 6,
    });
}