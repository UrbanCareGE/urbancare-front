import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { UpdateProfileImageDTO } from '@/model/dto/auth.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export function useUpdateProfileImage() {
  const t = useTranslation();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (data: UpdateProfileImageDTO) =>
      ProfileService.updateProfileImage(data),
    onMutate: async (data: UpdateProfileImageDTO) => {
      updateUser({
        profileImageId: data.profileImageId,
      });
    },
    onSuccess: (data) => {
      toast.success(t.profile.profilePhotoUpdated);
    },
    onError: () => {
      toast.error(t.profile.profilePhotoFailed);
    },
  });
}
