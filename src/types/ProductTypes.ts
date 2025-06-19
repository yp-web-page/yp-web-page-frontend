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

export interface GetPricesRequest {
    productId: string,
    printIds: string[]
}

export interface PrintingProductPricesResponse {
    priceDtos: PrintingProductPrice[]
};

export interface PrintingProductPrice {
    minQuantity: number,
    maxQuantity: number,
    price: number,
    productId: string,
    printId: string
}

