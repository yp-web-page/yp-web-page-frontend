import erpClient from "../api/erpClient"
import type { ResponseListViewById } from "../types/ListType"
import { ErpCategoryProducts, toSpringPage } from "../api/erpMappers"

/**
 * A "list" is a subcategory; its products come from the ERP storefront under
 * /categories/:id/products. The ERP paginates with `page` + `pageSize`; we map
 * its compact envelope back to the legacy Spring Page shape the UI reads.
 */
const getListViewById = async (
    id: string,
    page: number = 0,
    size: number = 5,
): Promise<ResponseListViewById> => {
    const response = await erpClient.get<ErpCategoryProducts>(`/categories/${id}/products`, {
        params: { page, pageSize: size },
    })
    return {
        name: response.data.category.name,
        products: toSpringPage(response.data.products),
    }
}

export const listService = {
    getListViewById
}
