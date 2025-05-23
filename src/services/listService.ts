import { API_ENDPOINTS } from "../api/endpoints"
import apiClient from "../api/axios"
import type { ResponseListViewById } from "../types/ListType"

const getListViewById = async (id: string): Promise<ResponseListViewById> => {
    const response = await apiClient.get(API_ENDPOINTS.lists.getListViewById.replace(':id', id))
    return response.data as ResponseListViewById
}

export const listService = {
    getListViewById
}