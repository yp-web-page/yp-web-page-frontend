import { useQuery } from "@tanstack/react-query";
import { serviceInventory } from "../services/serviceInventory";
import type { Inventory } from "../types/inventory";

export const useGetInventoriesInfo = () => {
  return useQuery<Inventory[]>({
    queryKey: ["inventories"],
    queryFn: serviceInventory.getAllInventoryInfo,
  });
};

