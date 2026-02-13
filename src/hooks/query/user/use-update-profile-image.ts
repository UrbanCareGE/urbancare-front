import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { UpdateProfileImageDTO } from '@/model/auth.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';

export function useUpdateProfileImage() {
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (data: UpdateProfileImageDTO) =>
      ProfileService.updateProfileImage(data),
    onSuccess: (data) => {
      updateUser({
        profileImageId: data.profileImageId,
      });
      toast.success('პროფილის ფოტო წარმატებით განახლდა');
    },
    onError: () => {
      toast.error('პროფილის ფოტოს განახლება ვერ მოხერხდა');
    },
  });
}
