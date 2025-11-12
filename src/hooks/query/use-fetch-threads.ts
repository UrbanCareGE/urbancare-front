'use client'

import {useQuery} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";

export function useFetchThreads() {
    const {user, isLoading: isUserLoading} = useAuth();

    const queryResult = useQuery({
        queryKey: ["thread_list", user?.selectedApartment?.id],
        queryFn: () => ThreadService.getAll(user!.selectedApartment!.id, {page: 0, size: 10}),
        enabled: !isUserLoading && !!user?.selectedApartment?.id,
        staleTime: 60 * 5 * 1e3,
    });

    return queryResult;
}