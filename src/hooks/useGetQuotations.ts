import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { quotationService } from "../services/quotationService";
import { GetQuotations } from "../types/Quotation";

const getAllQuotations = quotationService.getAllQuotations;

const useGetAllQuotations = (username: string): UseQueryResult<GetQuotations, Error> => {
    return useQuery<GetQuotations, Error, GetQuotations, [string, string]>({
        queryKey: [...QUERY_KEYS.quotations.getAllQuotation, username],
        queryFn: () => getAllQuotations(username),
        staleTime: 1000 * 60 * 60 * 6,
        gcTime: 1000 * 60 * 60 * 6,
    });
};

export default useGetAllQuotations;