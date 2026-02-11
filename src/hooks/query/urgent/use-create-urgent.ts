import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { UrgentItemDTO } from '@/model/urgent.dto';
import { UserContextType } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';

export type OptimisticUrgentItem = UrgentItemDTO & {
  _isPending?: boolean;
  _tempId?: string;
};

export function useCreateUrgent(
  userContext: UserContextType,
  onSuccess?: (urgent: UrgentItemDTO) => void
) {
  const queryClient = useQueryClient();
  const { user } = userContext;

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({
      content,
    }: {
      apartmentId: string;
      content: string;
    }) => {
      return await UrgentService.add(
        user?.selectedApartment?.id ?? '',
        content
      );
    },

    onMutate: async ({ apartmentId, content }) => {
      const queryKey = ['urgent', 'list', apartmentId];

      await queryClient.cancelQueries({ queryKey });

      const previousItems =
        queryClient.getQueryData<OptimisticUrgentItem[]>(queryKey);

      const tempId = `temp-${Date.now()}`;
      const optimisticItem: OptimisticUrgentItem = {
        id: tempId,
        _tempId: tempId,
        _isPending: true,
        content,
        resolved: false,
        expiresAt: new Date(),
        createdAt: new Date(),
        userInfo: {
          name: user?.name ?? '',
          surname: user?.surname ?? '',
        },
      };

      queryClient.setQueryData<OptimisticUrgentItem[]>(queryKey, (prev) =>
        prev ? [optimisticItem, ...prev] : [optimisticItem]
      );

      return { previousItems, tempId, queryKey };
    },

    onSuccess: (urgentItemDTO, variables, context) => {
      if (!context) return;

      queryClient.setQueryData<OptimisticUrgentItem[]>(
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

  const onSubmit = (apartmentId: string, content: string) => {
    mutate({ apartmentId, content });
  };

  return { onSubmit, isPending, isError, error };
}
