import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { productService } from "../services/productService";
import type { Product } from "../types/ProductTypes";

const getProductById = productService.getProductById;

export const useGetProductById = (id: string): UseQueryResult<Product, Error> => {
    return useQuery<Product, Error, Product, [string, string]>({
        queryKey: [QUERY_KEYS.products.byId[0], id],
        queryFn: () => getProductById(id),
        staleTime: 1000 * 60 * 60 * 2, // 2 hours
        refetchOnWindowFocus: false,
    });
};
