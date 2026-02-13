'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';
import { OptimisticUrgentItem } from './use-create-urgent';
import { ResolveUrgentItemDTO } from '@/model/urgent.dto';

export function useResolveUrgent() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ apartmentId, id }: ResolveUrgentItemDTO) => {
      return await UrgentService.resolve(apartmentId, id);
    },

    onSuccess: (_, { id }) => {
      const queryKey = ['urgent', 'list', user?.selectedApartment?.id];
      queryClient.setQueryData<OptimisticUrgentItem[]>(queryKey, (prev) =>
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
