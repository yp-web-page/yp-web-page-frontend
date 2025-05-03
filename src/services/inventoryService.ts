import { ResponseInventoriesInfo } from "../types/inventory";
import { API_ENDPOINTS } from "../api/endpoints";
import apiClient from "../api/axios";

/**
 * Get all inventories info
 */
const getInventoriesInfo = async (): Promise<ResponseInventoriesInfo[]> => {
    const response = await apiClient.get(API_ENDPOINTS.inventories.getInventoriesInfo);
    return response.data.content as ResponseInventoriesInfo[];
};

export const inventoryService = {
    getInventoriesInfo,
};