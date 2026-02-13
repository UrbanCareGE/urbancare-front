'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';
import { OptimisticUrgentItem } from './use-create-urgent';

export function useResolveUrgent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      apartmentId,
      id,
    }: {
      apartmentId: string;
      id: string;
    }) => {
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
