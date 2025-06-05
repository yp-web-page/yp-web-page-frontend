import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { listService } from "../services/listService";
import type { ResponseListViewById } from "../types/ListType";

const getListViewById = listService.getListViewById;

export const useGetListView = (
    id: string,
    page: number = 0,
    size: number = 5
): UseQueryResult<ResponseListViewById, Error> => {
    return useQuery<ResponseListViewById, Error, ResponseListViewById, [string, string, number, number]>({
        queryKey: [...QUERY_KEYS.lists.view, id, page, size],
        queryFn: () => getListViewById(id, page, size),
        staleTime: 1000 * 60 * 60 * 2, // 2 hours
        refetchOnWindowFocus: false,
    });
};