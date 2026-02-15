import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddCarDTO, CarDTO } from '@/model/auth.dto';
import { ProfileService } from '@/service/profile-service';
import { toast } from 'sonner';

const CARS_QUERY_KEY = ['profile-cars', 'list'] as const;

export function useAddCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddCarDTO) => ProfileService.addCar(data),
    onMutate: async (newCar) => {
      await queryClient.cancelQueries({ queryKey: CARS_QUERY_KEY });

      const previousCars = queryClient.getQueryData<CarDTO[]>(CARS_QUERY_KEY);

      queryClient.setQueryData<CarDTO[]>(CARS_QUERY_KEY, (old) => [
        ...(old ?? []),
        { id: `temp-${Date.now()}`, licensePlate: newCar.licensePlate },
      ]);

      return { previousCars };
    },
    onSuccess: (savedCar) => {
      queryClient.setQueryData<CarDTO[]>(
        CARS_QUERY_KEY,
        (old) =>
          old?.map((car) => (car.id.startsWith('temp-') ? savedCar : car)) ?? [
            savedCar,
          ]
      );
    },
    onError: (_error, _newCar, context) => {
      if (context?.previousCars) {
        queryClient.setQueryData(CARS_QUERY_KEY, context.previousCars);
      }
      toast.error('მანქანის დამატება ვერ მოხერხდა');
    },
  });
}
