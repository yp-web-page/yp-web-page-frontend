export interface ResponseFeaturedProducts {
    products: ProductCard[]
}

export interface ProductCard {
    id: string
    name: string
    imageUrl: string
}