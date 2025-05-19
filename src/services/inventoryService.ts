import { ResponseInventoriesInfo } from "../types/inventory";
import { API_ENDPOINTS } from "../api/endpoints";
import apiClient from "../api/axios";

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

export const inventoryService = {
    getFavoriteInventoriesInfo,
    getAllInventoriesInfo,
};