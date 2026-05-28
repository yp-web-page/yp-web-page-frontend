import erpClient from "../api/erpClient";
import { ResponseInventoriesInfo, ResponseInventoryViewById } from "../types/inventory";
import {
    ErpCategoryNode,
    ErpCategoryDetail,
    mapCategoryNodeToInventoryInfo,
    mapCategoryDetailToInventoryView,
} from "../api/erpMappers";

/**
 * Categories ("inventories" in the legacy model) are served by the ERP
 * storefront API. Root categories = inventories, their children = lists.
 */
const getAllInventoriesInfo = async (): Promise<ResponseInventoriesInfo[]> => {
    const response = await erpClient.get<ErpCategoryNode[]>("/categories");
    return response.data.map(mapCategoryNodeToInventoryInfo);
};

const getFavoriteInventoriesInfo = async (): Promise<ResponseInventoriesInfo[]> => {
    const response = await erpClient.get<ErpCategoryNode[]>("/categories", {
        params: { featured: true },
    });
    return response.data.map(mapCategoryNodeToInventoryInfo);
};

const getInventoryViewById = async (id: string): Promise<ResponseInventoryViewById> => {
    const response = await erpClient.get<ErpCategoryDetail>(`/categories/${id}`);
    return mapCategoryDetailToInventoryView(response.data);
};

export const inventoryService = {
    getFavoriteInventoriesInfo,
    getAllInventoriesInfo,
    getInventoryViewById,
};
