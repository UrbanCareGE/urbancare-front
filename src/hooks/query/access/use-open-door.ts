'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AccessService } from '@/service/access-service';
import { useTranslation } from '@/i18n';

interface OpenDoorParams {
  controllerId: string;
  deviceIndex: number;
}

export function useOpenDoor(apartmentId: string) {
  const t = useTranslation();
  return useMutation({
    mutationFn: ({ controllerId, deviceIndex }: OpenDoorParams) =>
      AccessService.openDoor(apartmentId, controllerId, deviceIndex),
    onSuccess: () => {
      toast.success(t.access.doorOpened);
    },
    onError: () => {
      toast.error(t.access.doorOpenFailed);
    },
  });
}
