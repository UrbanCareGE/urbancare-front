import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { UpdateProfileDTO } from '@/model/dto/auth.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';

export function useUpdateProfile() {
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (data: UpdateProfileDTO) => ProfileService.updateProfile(data),
    onMutate: async (data: UpdateProfileDTO) => {
      updateUser({
        name: data.name,
        surname: data.surname,
      });
    },
    // onSuccess: (data) => {
    //   console.log(data);
    //   updateUser({
    //     name: data.name,
    //     surname: data.surname,
    //   });
    //   toast.success('პროფილი წარმატებით განახლდა');
    // },
    onError: () => {
      toast.error('პროფილის განახლება ვერ მოხერხდა');
    },
  });
}
