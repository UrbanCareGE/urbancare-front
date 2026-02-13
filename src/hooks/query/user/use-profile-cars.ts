import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { toast } from 'sonner';

type CarModel = {
  id: string;
  licensePlate: string;
};

type AddCarModel = {
  licensePlate: string;
};

const CARS_QUERY_KEY = ['profile-cars'] as const;

export function useProfileCars() {
  const queryClient = useQueryClient();

  const carsQuery = useQuery({
    queryKey: CARS_QUERY_KEY,
    queryFn: ProfileService.getCars,
  });

  const addCarMutation = useMutation({
    mutationFn: (data: AddCarModel) => ProfileService.addCar(data),
    onMutate: async (newCar) => {
      await queryClient.cancelQueries({ queryKey: CARS_QUERY_KEY });

      const previousCars = queryClient.getQueryData<CarModel[]>(CARS_QUERY_KEY);

      queryClient.setQueryData<CarModel[]>(CARS_QUERY_KEY, (old) => [
        ...(old ?? []),
        { id: `temp-${Date.now()}`, licensePlate: newCar.licensePlate },
      ]);

      return { previousCars };
    },
    onSuccess: (savedCar) => {
      queryClient.setQueryData<CarModel[]>(
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

  const deleteCarMutation = useMutation({
    mutationFn: (id: string) => ProfileService.deleteCar(id),
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: CARS_QUERY_KEY });

      const previousCars = queryClient.getQueryData<CarModel[]>(CARS_QUERY_KEY);

      queryClient.setQueryData<CarModel[]>(
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

  return {
    cars: carsQuery.data ?? [],
    isLoading: carsQuery.isLoading,
    addCar: addCarMutation.mutateAsync,
    isAdding: addCarMutation.isPending,
    deleteCar: deleteCarMutation.mutateAsync,
    isDeleting: deleteCarMutation.isPending,
  };
}
