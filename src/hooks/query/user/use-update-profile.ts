import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '@/service/profile-service';
import { UpdateProfileDTO } from '@/model/dto/auth.dto';
import { useAuth } from '@/components/provider/AuthProvider';
import { toast } from 'sonner';
import { useTranslation } from '@/i18n';

export function useUpdateProfile() {
  const t = useTranslation();
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
      toast.error(t.profile.profileUpdateFailed);
    },
  });
}
