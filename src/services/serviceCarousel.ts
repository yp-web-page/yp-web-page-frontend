import erpClient from '../api/erpClient';
import { ErpBanner, mapBannersToCarousel } from '../api/erpMappers';
import { GetCarouselImages } from '../types/GetCarouselImages';

/**
 * Hero carousel images. They come from the ERP storefront API (`GET /banners`),
 * which returns enabled banners only, ordered, at most three. The legacy
 * backend's `/carousel/images` is gone.
 */
const fetchCarouselImages = async (): Promise<GetCarouselImages> => {
    const response = await erpClient.get<{ items: ErpBanner[] }>('/banners');
    return mapBannersToCarousel(response.data?.items);
};

export const serviceCarousel = {
    fetchCarouselImages,
};
