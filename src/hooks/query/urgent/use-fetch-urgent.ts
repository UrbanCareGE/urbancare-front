'use client';

import { useQuery } from '@tanstack/react-query';
import { UrgentService } from '@/service/urgent-service';
import { AuthContextType } from '@/components/provider/AuthProvider';

export function useFetchUrgent(userContext: AuthContextType) {
  const { user, isLoading } = userContext;
  const queryResult = useQuery({
    queryKey: ['urgent', 'list', user?.selectedApartment.id],
    queryFn: () => UrgentService.getAll(user?.selectedApartment?.id ?? 'yle'),
    enabled: !isLoading && !!user?.selectedApartment.id,
    staleTime: 5 * 60 * 1e3,
  });

  return queryResult;
}
