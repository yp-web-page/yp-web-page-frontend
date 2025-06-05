import { API_ENDPOINTS } from "../api/endpoints"
import apiClient from "../api/axios"
import type { ResponseListViewById } from "../types/ListType"

const getListViewById = async (id: string, page: number = 0, size: number = 5): Promise<ResponseListViewById> => {
    const response = await apiClient.get(API_ENDPOINTS.lists.getListViewById.replace(':id', id), {
        params: {
            page,
            size
        }
    })
    return response.data as ResponseListViewById
}

export const listService = {
    getListViewById
}