import { useQuery } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';

export function useFetchCar() {
  return useQuery({
    queryKey: ['profile-cars', 'list'],
    queryFn: ProfileService.getCars,
    staleTime: 5 * 60 * 1e3,
  });
}
