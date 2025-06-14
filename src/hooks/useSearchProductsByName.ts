import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { productService } from "../services/productService";
import type { ResponseSearchedProducts } from "../types/ProductTypes";

const searchProductsByName = productService.searchProductsByName;

export const useSearchProductsByName = (query: string): UseQueryResult<ResponseSearchedProducts, Error> => {
    return useQuery<ResponseSearchedProducts, Error, ResponseSearchedProducts, [string, string]>({
        queryKey: [...QUERY_KEYS.products.search, query],
        queryFn: () => searchProductsByName(query),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        enabled: query.length > 0, // Only run the query if there's a search term
    });
};