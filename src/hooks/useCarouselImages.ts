import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '../api/queryKeys';
import { serviceCarousel } from '../services/serviceCarousel';
import { GetCarouselImages } from '../types/GetCarouselImages';

export const useCarouselImages = (): UseQueryResult<GetCarouselImages, Error> =>
    useQuery<GetCarouselImages, Error, GetCarouselImages, readonly string[]>({
        queryKey: QUERY_KEYS.carousel.images,
        queryFn: () => serviceCarousel.fetchCarouselImages(),
        staleTime: 1000 * 60 * 60 * 2,
        gcTime: 1000 * 60 * 60 * 2,
        refetchOnWindowFocus: false,
    });
