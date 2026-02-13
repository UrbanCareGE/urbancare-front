import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { ChangePasswordDTO } from '@/model/auth.dto';
import { toast } from 'sonner';

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordDTO) =>
      ProfileService.changePassword(data),
    onSuccess: () => {
      toast.success('პაროლი წარმატებით შეიცვალა');
    },
    onError: () => {
      toast.error('პაროლის შეცვლა ვერ მოხერხდა');
    },
  });
}
