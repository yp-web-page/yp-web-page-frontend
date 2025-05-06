import { ResponseInventoriesInfo } from "../types/inventory";
import { API_ENDPOINTS } from "../api/endpoints";
import apiClient from "../api/axios";

/**
 * Get all inventories info
 */
const getFavoriteInventoriesInfo = async (): Promise<ResponseInventoriesInfo[]> => {
    const response = await apiClient.get(API_ENDPOINTS.inventories.getFavoriteInventoriesInfo);
    return response.data as ResponseInventoriesInfo[];
};

export const inventoryService = {
    getFavoriteInventoriesInfo,
};