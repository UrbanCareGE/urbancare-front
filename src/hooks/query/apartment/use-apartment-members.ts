import { useQuery } from '@tanstack/react-query';
import { ApartmentService } from '@/service/apartment-service';

export function useApartmentMembers(
  apartmentId: string | undefined,
  options: { enabled?: boolean } = {}
) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: ['apartments', 'members', apartmentId],
    queryFn: () => ApartmentService.getMembers(apartmentId!),
    enabled: enabled && !!apartmentId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
