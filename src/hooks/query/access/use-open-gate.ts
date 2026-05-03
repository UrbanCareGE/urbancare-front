'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AccessService } from '@/service/access-service';
import { useTranslation } from '@/i18n';

interface OpenGateParams {
  controllerId: string;
  deviceIndex: number;
}

export function useOpenGate(apartmentId: string) {
  const t = useTranslation();
  return useMutation({
    mutationFn: ({ controllerId, deviceIndex }: OpenGateParams) =>
      AccessService.openGate(apartmentId, controllerId, deviceIndex),
    onSuccess: () => {
      toast.success(t.access.gateOpened);
    },
    onError: () => {
      toast.error(t.access.gateOpenFailed);
    },
  });
}
