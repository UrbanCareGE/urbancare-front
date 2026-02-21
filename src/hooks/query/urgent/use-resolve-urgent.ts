'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';
import { ResolveUrgentItemDTO, UrgentItemDTO } from '@/model/dto/urgent.dto';
import { OptimisticData } from '@/model/dto/common.dto';

export function useResolveUrgent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ apartmentId, id }: ResolveUrgentItemDTO) => {
      return await UrgentService.resolve(apartmentId, id);
    },

    onSuccess: (_, { id }) => {
      const queryKey = ['urgent', 'list', user?.selectedApartment?.id];
      queryClient.setQueryData<OptimisticData<UrgentItemDTO>[]>(
        queryKey,
        (prev) =>
          prev?.map((item) =>
            item.id === id ? { ...item, resolved: true } : item
          )
      );
    },

    onError: () => {
      toast.error('შეცდომა შეტყობინების დასრულებისას');
    },
  });
}
