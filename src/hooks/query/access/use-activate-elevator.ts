'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AccessService } from '@/service/access-service';
import { useTranslation } from '@/i18n';

interface ActivateElevatorParams {
  controllerId: string;
  deviceIndex: number;
}

export function useActivateElevator(apartmentId: string) {
  const t = useTranslation();
  return useMutation({
    mutationFn: ({ controllerId, deviceIndex }: ActivateElevatorParams) =>
      AccessService.activateElevator(apartmentId, controllerId, deviceIndex),
    onSuccess: () => {
      toast.success(t.access.elevatorActivated);
    },
    onError: () => {
      toast.error(t.access.elevatorActivateFailed);
    },
  });
}
