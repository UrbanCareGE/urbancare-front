'use client';

import { useQuery } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { useAuth } from '@/components/provider/AuthProvider';

export function useFetchUrgent() {
  const { user, isLoading } = useAuth();
  return useQuery({
    queryKey: ['urgent', 'list', user.selectedApartmentId!],
    queryFn: () => UrgentService.getAll(user.selectedApartmentId!),
    enabled: !isLoading && !!user.selectedApartmentId,
    staleTime: 5 * 60 * 1e3,
  });
}
