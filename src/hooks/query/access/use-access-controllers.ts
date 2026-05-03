'use client';

import { useQuery } from '@tanstack/react-query';
import { AccessService } from '@/service/access-service';

export const accessKeys = {
  all: ['access'] as const,
  controllers: (apartmentId: string, block: string) =>
    [...accessKeys.all, 'controllers', apartmentId, block] as const,
};

export function useAccessControllers(apartmentId: string, block: string) {
  return useQuery({
    queryKey: accessKeys.controllers(apartmentId, block),
    queryFn: () => AccessService.listControllers(apartmentId, block),
    enabled: !!apartmentId && !!block,
    staleTime: 60 * 1000,
  });
}
