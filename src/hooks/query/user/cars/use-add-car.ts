import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddCarDTO, CarDTO } from '@/model/dto/auth.dto';
import { ProfileService } from '@/service/profile-service';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

const CARS_QUERY_KEY = ['profile-cars', 'list'] as const;

export function useAddCar() {
  const t = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddCarDTO) => ProfileService.addCar(data),
    onMutate: async (newCar) => {
      await queryClient.cancelQueries({ queryKey: CARS_QUERY_KEY });

      const previousCars = queryClient.getQueryData<CarDTO[]>(CARS_QUERY_KEY);

      const isDuplicate = previousCars?.some(
        (car) => car.licensePlate === newCar.licensePlate
      );

      if (isDuplicate) {
        throw new Error(t.cars.carAlreadyAdded);
      }

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
    onError: (error, _newCar, context) => {
      if (context?.previousCars) {
        queryClient.setQueryData(CARS_QUERY_KEY, context.previousCars);
      }
      toast.error(error.message || t.cars.carAddFailed);
    },
  });
}
