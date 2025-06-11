import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { productService } from "../services/productService";
import type { PaginatedResponse, ProductCard } from "../types/ProductTypes";

const searchProductsByName = productService.searchProductsByName;

export const useSearchProductsByName = (
    query: string,
    page: number = 0,
    size: number = 5
): UseQueryResult<PaginatedResponse<ProductCard>, Error> => {
    return useQuery<PaginatedResponse<ProductCard>, Error, PaginatedResponse<ProductCard>, [string, string, number, number]>({
        queryKey: [...QUERY_KEYS.products.search, query, page, size],
        queryFn: () => searchProductsByName(query, page, size),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        enabled: query.length > 0, // Only run the query if there's a search term
    });
};