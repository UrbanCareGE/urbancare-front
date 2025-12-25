import {useQuery} from "@tanstack/react-query";
import {UserContextType} from "@/components/provider/AuthProvider";
import {AuthService} from "@/service/auth-service";


export function useFetchChat(userContext: UserContextType) {
    const {user, isLoading} = userContext;
    const queryResult = useQuery({
        queryKey: ["chat", "info", user?.selectedApartment.id],
        queryFn: () => AuthService.getChatInfo(user!.selectedApartment!.id),
        enabled: !isLoading && !!user?.selectedApartment.id,
        staleTime: 5 * 60 * 1e3,
    });

    return queryResult;

}