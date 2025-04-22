import {API_ENDPOINTS} from "../api/endpoints";
import apiClient from "../api/axios";

const getAllInventoryInfo = async (): Promise<Inventory[]> => {
  const response = await apiClient.get(API_ENDPOINTS.INVENTORY.GET_ALL);
  return response.data;
}

export const serviceInventory {
  getAllInventoryInfo,
}
