export interface GetCarouselImages {
    carouselImages: string[];
    /**
     * Alt text parallel to `carouselImages`, one entry per image. Optional so
     * the type stays compatible with any consumer that only reads the URLs.
     */
    carouselAlts?: string[];
}
