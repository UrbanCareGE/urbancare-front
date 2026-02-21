import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/provider/AuthProvider';
import { AuthService } from '@/service/auth-service';

export function useFetchChat() {
  const { user, isLoading } = useAuth();

  return useQuery({
    queryKey: ['chat', 'info', user.selectedApartmentId],
    queryFn: () => AuthService.getChatInfo(user.selectedApartmentId),
    enabled: !isLoading && !!user.selectedApartmentId,
    staleTime: 5 * 60 * 1e3,
  });
}
