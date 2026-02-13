'use client';

import { useQuery } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { useAuth } from '@/components/provider/AuthProvider';

export function useFetchUrgent() {
  const { user, isLoading } = useAuth();
  return useQuery({
    queryKey: ['urgent', 'list', user?.selectedApartment.id],
    queryFn: () => UrgentService.getAll(user?.selectedApartment?.id ?? 'yle'),
    enabled: !isLoading && !!user?.selectedApartment.id,
    staleTime: 5 * 60 * 1e3,
  });
}
