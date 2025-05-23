import { ProductCard } from "./ProductTypes"

export interface ListName {
    id: string
    name: string
}

export interface ResponseListViewById {
    name: string
    products: ProductCard[]
}