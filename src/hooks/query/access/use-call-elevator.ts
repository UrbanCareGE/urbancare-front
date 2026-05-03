'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AccessService } from '@/service/access-service';
import { useTranslation } from '@/i18n';

interface CallElevatorParams {
  floor: number;
}

export function useCallElevator(apartmentId: string, block: string) {
  const t = useTranslation();
  return useMutation({
    mutationFn: ({ floor }: CallElevatorParams) =>
      AccessService.callElevator(apartmentId, block, floor),
    onSuccess: (_, vars) => {
      toast.success(
        t.access.elevatorCalledToFloor.replace('{floor}', String(vars.floor))
      );
    },
    onError: () => {
      toast.error(t.access.elevatorCallFailed);
    },
  });
}
