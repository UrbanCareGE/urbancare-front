import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { CreateUrgentItemDTO, UrgentItemDTO } from '@/model/dto/urgent.dto';
import { toast } from 'sonner';
import { useAuth } from '@/components/provider/AuthProvider';
import { useTranslation } from '@/i18n';
import { UrgentModelOptimistic } from '@/model/model/urgent.model';

export function useCreateUrgent(onSuccess?: (urgent: UrgentItemDTO) => void) {
  const t = useTranslation();
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
        queryClient.getQueryData<UrgentModelOptimistic[]>(queryKey);

      const tempId = `temp-${Date.now()}`;
      const optimisticItem: UrgentModelOptimistic = {
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

      queryClient.setQueryData<UrgentModelOptimistic[]>(queryKey, (prev) =>
        prev ? [optimisticItem, ...prev] : [optimisticItem]
      );

      return { previousItems, tempId, queryKey };
    },

    onSuccess: (urgentItemDTO, variables, context) => {
      if (!context) return;

      queryClient.setQueryData<UrgentModelOptimistic[]>(
        context.queryKey,
        (prev) =>
          prev?.map((item) =>
            item._tempId === context.tempId
              ? { ...urgentItemDTO, _isPending: false }
              : { ...item }
          ) ?? [urgentItemDTO]
      );

      onSuccess?.(urgentItemDTO);
    },

    onError: (err, variables, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(context.queryKey, context.previousItems);
      }
      toast.error(t.urgent.errorSending);
    },
  });

  const onSubmit = (content: string) => {
    if (user.selectedApartmentId)
      mutate({ apartmentId: user.selectedApartmentId, content: content });
  };

  return { onSubmit, isPending, isError, error };
}
