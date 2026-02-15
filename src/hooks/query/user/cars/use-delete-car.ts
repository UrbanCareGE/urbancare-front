import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { CarDTO } from '@/model/auth.dto';
import { toast } from 'sonner';

export function useDeleteCar() {
  const queryClient = useQueryClient();
  const CARS_QUERY_KEY = ['profile-cars', 'list'];

  return useMutation({
    mutationFn: (id: string) => ProfileService.deleteCar(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: CARS_QUERY_KEY });

      const previousCars = queryClient.getQueryData<CarDTO[]>(CARS_QUERY_KEY);

      queryClient.setQueryData<CarDTO[]>(
        CARS_QUERY_KEY,
        (old) => old?.filter((car) => car.id !== deletedId) ?? []
      );

      return { previousCars };
    },
    onError: (_error, _deletedId, context) => {
      if (context?.previousCars) {
        queryClient.setQueryData(CARS_QUERY_KEY, context.previousCars);
      }
      toast.error('მანქანის წაშლა ვერ მოხერხდა');
    },
  });
}
