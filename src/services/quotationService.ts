import apiClient from "../api/axios";
import { API_ENDPOINTS } from "../api/endpoints";
import { AddProductToQuotationRequest, GetQuotations, SendEmailQuotationRequest } from "../types/Quotation";

const addProductToQuotation = async (addProductToQuotationRequest: AddProductToQuotationRequest): Promise<void> => {
    const response = await apiClient.post(API_ENDPOINTS.quotation.addProductToQuotation, addProductToQuotationRequest);
    return response.data;
};

const getAllQuotations = async (username: string): Promise<GetQuotations> => {
    const response = await apiClient.get(API_ENDPOINTS.quotation.getAllQuotations.replace(':username', username));
    return response.data;
};

const deleteQuotation = async (quotationId: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.quotation.deleteQuotation.replace(':quotationId', quotationId));
};

const sendEmailQuotation = async(SendEmailQuotationRequest: SendEmailQuotationRequest): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.email.sendEmailQuotation, SendEmailQuotationRequest);
};

const generatePdfQuotation = async(quotationId: string): Promise<Blob> => {
    const response = await apiClient.get(API_ENDPOINTS.quotation.generatePdfQuotation.replace(':quotationId', quotationId),
    { responseType: 'blob' });
    return response.data;
};

export const quotationService = {
  addProductToQuotation,
  getAllQuotations,
  deleteQuotation,
  sendEmailQuotation,  
  generatePdfQuotation,
};