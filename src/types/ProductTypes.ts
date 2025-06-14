export interface ResponseFeaturedProducts {
    products: FeaturedProductCard[]
}

export interface FeaturedProductCard {
    id: string
    name: string
    imageUrl: string
}

export interface ProductCard {
    id: string
    name: string
    imageUrl: string
    colors: Color[]
    price: string
}

export interface Color {
    name: string
    hexCode: string
}

export interface PrintingMethod {
    id: string
    name: string
}

export interface Product {
    id: string
    name: string
    imageUrl: string
    colors: Color[]
    price: string
    description: string
    size: string
    material: string
    printingArea: string
    printingMethods: PrintingMethod[]
    boxContent: string
    isPrintPersonalizable: boolean
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

export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

export interface PaginatedResponse<T> {
    content: T[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    size: number
    number: number
    sort: Sort
    numberOfElements: number
    empty: boolean
}

export interface ProductFilterRequest {
    name?: string
    featured?: boolean
    material?: string
    size?: string
    minPrice?: number
    maxPrice?: number
    printPersonalizable?: boolean
    listId?: string
    description?: string
}

