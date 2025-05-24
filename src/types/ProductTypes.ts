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
    price: number
}

export interface Color {
    hexCode: string
}

