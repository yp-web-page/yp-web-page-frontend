import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { productService } from "../services/productService";
import type { PaginatedResponse, ProductCard, ProductFilterRequest } from "../types/ProductTypes";

const filterProducts = productService.filterProducts;

export const useFilterProducts = (
    filter: ProductFilterRequest,
    page: number = 0,
    size: number = 10
): UseQueryResult<PaginatedResponse<ProductCard>, Error> => {
    return useQuery<PaginatedResponse<ProductCard>, Error, PaginatedResponse<ProductCard>, [string, ProductFilterRequest, number, number]>({
        queryKey: [QUERY_KEYS.products.filter[0], filter, page, size],
        queryFn: () => filterProducts(filter, page, size),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });
}; 