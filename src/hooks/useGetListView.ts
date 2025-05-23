import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { listService } from "../services/listService";
import type { ResponseListViewById } from "../types/ListType";

const getListViewById = listService.getListViewById;

export const useGetListView = (id: string): UseQueryResult<ResponseListViewById, Error> => {
    return useQuery<ResponseListViewById, Error, ResponseListViewById, [string, string]>({
        queryKey: [...QUERY_KEYS.lists.view, id],
        queryFn: () => getListViewById(id),
        staleTime: 1000 * 60 * 60 * 2, // 2 hours
        refetchOnWindowFocus: false,
    });
};