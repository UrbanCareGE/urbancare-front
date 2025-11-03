import {useQuery} from "@tanstack/react-query";
import {UrgentService} from "@/service/urgent-service";
import {useAuth} from "@/components/provider/AuthProvider";


export function useFetchUrgent() {
    const {user, isLoading: isUserLoading} = useAuth();

    const queryResult = useQuery({
        queryKey: ["urgent_list", user?.selectedApartment?.id],
        queryFn: () => UrgentService.getAll(user?.selectedApartment?.id ?? 'yle'),
        enabled: !isUserLoading && !!user?.selectedApartment?.id,
        staleTime: 5 * 1000,
    });

    return queryResult;
}