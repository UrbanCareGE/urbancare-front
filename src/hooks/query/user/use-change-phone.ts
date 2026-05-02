'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { ChangePhoneDTO } from '@/model/dto/auth.dto';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export function useChangePhone() {
  const t = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangePhoneDTO) => ProfileService.changePhone(data),
    onSuccess: () => {
      toast.success(t.profile.phoneChanged);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error(t.profile.phoneChangeFailed);
    },
  });
}
