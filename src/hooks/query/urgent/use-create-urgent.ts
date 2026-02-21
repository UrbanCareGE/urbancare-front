import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { CreateUrgentItemDTO, UrgentItemDTO } from '@/model/dto/urgent.dto';
import { toast } from 'sonner';
import { useAuth } from '@/components/provider/AuthProvider';
import { OptimisticData } from '@/model/dto/common.dto';

export function useCreateUrgent(onSuccess?: (urgent: UrgentItemDTO) => void) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ content, apartmentId }: CreateUrgentItemDTO) => {
      return await UrgentService.add(apartmentId, content);
    },

    onMutate: async ({ apartmentId, content }) => {
      const queryKey = ['urgent', 'list', apartmentId];

      await queryClient.cancelQueries({ queryKey });

      const previousItems =
        queryClient.getQueryData<OptimisticData<UrgentItemDTO>[]>(queryKey);

      const tempId = `temp-${Date.now()}`;
      const optimisticItem: OptimisticData<UrgentItemDTO> = {
        id: tempId,
        _tempId: tempId,
        _isPending: true,
        content,
        resolved: false,
        expiresAt: new Date(),
        createdAt: new Date(),
        userInfo: {
          name: user.name,
          surname: user.surname,
          id: user.id,
          profileImageId: user.profileImageId,
        },
      };

      queryClient.setQueryData<OptimisticData<UrgentItemDTO>[]>(
        queryKey,
        (prev) => (prev ? [optimisticItem, ...prev] : [optimisticItem])
      );

      return { previousItems, tempId, queryKey };
    },

    onSuccess: (urgentItemDTO, variables, context) => {
      if (!context) return;

      queryClient.setQueryData<OptimisticData<UrgentItemDTO>[]>(
        context.queryKey,
        (prev) =>
          prev?.map((item) =>
            item._tempId === context.tempId
              ? { ...urgentItemDTO, _isPending: false }
              : item
          ) ?? [urgentItemDTO]
      );

      onSuccess?.(urgentItemDTO);
    },

    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(context.queryKey, context.previousItems);
      }
      toast.error('შეცდომა შეტყობინების გაგზავნისას');
    },
  });

  const onSubmit = (content: string) => {
    mutate({ apartmentId: user.selectedApartmentId, content: content });
  };

  return { onSubmit, isPending, isError, error };
}
