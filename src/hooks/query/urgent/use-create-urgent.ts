import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UrgentService} from "@/service/urgent-service";
import {UrgentItemDTO} from "@/model/urgent.dto";
import {UserContextType} from "@/components/provider/AuthProvider";

export function useCreateUrgent(userContext: UserContextType, onSuccess?: (urgent: UrgentItemDTO) => void) {
    const queryClient = useQueryClient();
    const {user, isLoading} = userContext;

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: async ({apartmentId, content}: { apartmentId: string, content: string }) => {
            return await UrgentService.add(apartmentId, content);
        },

        onSuccess: (urgentItemDTO) => {
            const queryKey = ['urgent', 'list', user?.selectedApartment.id];

            // Update cache
            queryClient.setQueryData<UrgentItemDTO[]>(
                queryKey,
                (prev) => prev ? [urgentItemDTO, ...prev] : [urgentItemDTO]
            );

            queryClient.invalidateQueries({
                queryKey,
                refetchType: 'none'
            });

            onSuccess?.(urgentItemDTO);
        },
    });

    const onSubmit = (apartmentId: string, content: string) => {
        mutate({apartmentId, content});
    };

    return {onSubmit, isPending, isError, error};
}
