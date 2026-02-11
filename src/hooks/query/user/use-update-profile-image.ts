import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { UpdateProfileImageDTO } from '@/model/auth.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileImageDTO) =>
      ProfileService.updateProfileImage(data),
    onSuccess: (data) => {
      updateUser({
        profileImageId: data.profileImageId,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('პროფილის ფოტო წარმატებით განახლდა');
    },
    onError: () => {
      toast.error('პროფილის ფოტოს განახლება ვერ მოხერხდა');
    },
  });

  return {
    updateProfileImage: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
