import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { ChangePasswordDTO } from '@/model/dto/auth.dto';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export function useChangePassword() {
  const t = useTranslation();
  return useMutation({
    mutationFn: (data: ChangePasswordDTO) =>
      ProfileService.changePassword(data),
    onSuccess: () => {
      toast.success(t.profile.passwordChanged);
    },
    onError: () => {
      toast.error(t.profile.passwordChangeFailed);
    },
  });
}
