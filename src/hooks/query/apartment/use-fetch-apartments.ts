import { PagingDTO } from '@/model/dto/common.dto';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ApartmentService } from '@/service/apartment-service';

export function useInfiniteApartments(query: string, page: PagingDTO) {
  const fetchItems = async ({ pageParam = 0 }) => {
    const data = await ApartmentService.getAll(query, pageParam, 15);

    return {
      ...data,
    };
  };

  return useInfiniteQuery({
    queryKey: ['apartments', 'list', query],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page.number === lastPage.page.totalPages - 1
        ? null
        : lastPage.page.number + 1,
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
