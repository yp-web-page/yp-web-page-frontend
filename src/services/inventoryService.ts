import { API_ENDPOINTS } from "../api/endpoints";
import apiClient from "../api/axios";
import { ResponseInventoriesInfo, ResponseInventoryViewById } from "../types/inventory";

const getAllInventoriesInfo = async (): Promise<ResponseInventoriesInfo[]> => {
    const response = await apiClient.get(API_ENDPOINTS.inventories.getInventoriesInfo)
    return response.data as ResponseInventoriesInfo[]
}

/**
 * Get featured inventories info
 */
const getFavoriteInventoriesInfo = async (): Promise<ResponseInventoriesInfo[]> => {
    const response = await apiClient.get(API_ENDPOINTS.inventories.getFavoriteInventoriesInfo);
    return response.data as ResponseInventoriesInfo[];
};

/**
 * Get inventory view by id
 */
const getInventoryViewById = async (id: string): Promise<ResponseInventoryViewById> => {
    const response = await apiClient.get(API_ENDPOINTS.inventories.getInventoryViewById.replace(':id', id));
    return response.data as ResponseInventoryViewById;
};

export const inventoryService = {
    getFavoriteInventoriesInfo,
    getAllInventoriesInfo,
    getInventoryViewById,
};