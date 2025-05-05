import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { inventoryService } from "../services/inventoryService";
import type { ResponseInventoriesInfo } from "../types/inventory";

const getInventoriesInfo = inventoryService.getFavoriteInventoriesInfo

export const useGetInventoriesInfo = (): UseQueryResult<ResponseInventoriesInfo[], Error> => {
    return useQuery<ResponseInventoriesInfo[], Error, ResponseInventoriesInfo[], [string]>({
      queryKey: QUERY_KEYS.inventories.info,
      queryFn: () => getInventoriesInfo(), 
      staleTime: 1000 * 60 * 60 * 2,
      refetchOnWindowFocus: false,
    });
}

