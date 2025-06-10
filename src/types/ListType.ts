import { ProductCard } from "./ProductTypes"

export interface ListName {
    id: string
    name: string
}

export interface Pageable {
    pageNumber: number
    pageSize: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
}

export interface PaginatedProducts {
    content: ProductCard[]
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    first: boolean
    size: number
    number: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    numberOfElements: number
    empty: boolean
}

export interface ResponseListViewById {
    name: string
    products: PaginatedProducts
}