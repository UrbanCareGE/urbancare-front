import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { UpdateProfileImageDTO } from '@/model/dto/auth.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';

export function useUpdateProfileImage() {
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
      toast.success('პროფილის ფოტო წარმატებით განახლდა');
    },
    onError: () => {
      toast.error('პროფილის ფოტოს განახლება ვერ მოხერხდა');
    },
  });
}
