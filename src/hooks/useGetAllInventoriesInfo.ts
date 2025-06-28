import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { inventoryService } from "../services/inventoryService";
import type { ResponseInventoriesInfo } from "../types/inventory";

const service = inventoryService.getAllInventoriesInfo

export const useGetAllInventoriesInfo = (): UseQueryResult<ResponseInventoriesInfo[], Error> => {
    return useQuery<ResponseInventoriesInfo[], Error, ResponseInventoriesInfo[], [string]>({
      queryKey: QUERY_KEYS.inventories.allInventories,
      queryFn: service, 
      staleTime: 1000 * 60 * 60 * 2,
      refetchOnWindowFocus: false,
    });
}
