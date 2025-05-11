import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { QUERY_KEYS } from "../api/queryKeys"
import { productService } from "../services/productService"
import type { ResponseFeaturedProducts } from "../types/ProductTypes"

const service = productService.getFeaturedProducts

export const useGetFeaturedProducts = (): UseQueryResult<ResponseFeaturedProducts[], Error> => {
    return useQuery<ResponseFeaturedProducts[], Error, ResponseFeaturedProducts[], [string]>({
        queryKey: QUERY_KEYS.products.featured,
        queryFn: () => service(),
        staleTime: 1000 * 60 * 60 * 6,
        gcTime: 1000 * 60 * 60 * 6,
    })
}