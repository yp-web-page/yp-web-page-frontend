import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { inventoryService } from "../services/inventoryService";
import type { ResponseInventoryViewById } from "../types/inventory";

const getInventoryViewById = inventoryService.getInventoryViewById;

export const useGetInventoryView = (id: string): UseQueryResult<ResponseInventoryViewById, Error> => {
    return useQuery<ResponseInventoryViewById, Error, ResponseInventoryViewById, [string, string]>({
        queryKey: [...QUERY_KEYS.inventories.view, id],
        queryFn: () => getInventoryViewById(id),
        staleTime: 1000 * 60 * 60 * 2, // 2 hours
        refetchOnWindowFocus: false,
    });
};
