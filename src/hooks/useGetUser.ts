import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/queryKeys";
import { serviceUser } from "../services/serviceUser";
import { User } from "../types/User";

const getUserProfile = serviceUser.getUserProfile;

export const useGetUser = (): UseQueryResult<User, Error> => {
    return useQuery<User, Error, User, [string]>({
        queryKey: QUERY_KEYS.user.getUserProfile,
        queryFn: getUserProfile,
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: 3
    });
}