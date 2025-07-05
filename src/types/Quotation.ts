enum QuotationStatus {
    CREATED,
    COMPLETED,
    CANCELED,
}

export interface AddProductToQuotation {
    id: string | null,
    username: string,
    productName: string,
    productPrice: number,
    colorName: string,
    printName: string,
    printPrice: number,
    quantity: number,
    width: number | null,
    height: number | null,
    subtotal: number,
    isPrintPersonalizable: boolean
};

export interface GetQuotation {
    quotationId: string,
    isActive: boolean,
    createdQuotation: Date,
    endQuotation: Date,
    status: QuotationStatus,
    addProductToQuotations: AddProductToQuotation[]
};

export interface GetQuotations {
    quotations: GetQuotation[]
};

export interface AddProductToQuotationRequest {
    addProductToQuotations: AddProductToQuotation[]
};

export interface SendEmailQuotationRequest {
    quotationId: string,
};