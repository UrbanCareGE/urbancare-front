import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { SetPasswordDTO } from '@/model/dto/auth.dto';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export function useSetPassword() {
  const t = useTranslation();
  return useMutation({
    mutationFn: (data: SetPasswordDTO) => ProfileService.setPassword(data),
    onSuccess: () => {
      toast.success(t.profile.passwordChanged);
    },
    onError: () => {
      toast.error(t.profile.passwordChangeFailed);
    },
  });
}
