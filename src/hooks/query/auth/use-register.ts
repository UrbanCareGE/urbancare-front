'use client';

import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/model/common.dto';
import { AuthService } from '@/service/auth-service';
import { useRouter } from 'next/navigation';
import { RegisterDTO } from '@/model/auth.dto';
import { error } from 'next/dist/build/output/log';

export function useRegister() {
  const router = useRouter();

  const { mutate, isPending, isError } = useMutation<
    string,
    ErrorResponse,
    RegisterDTO
  >({
    mutationFn: AuthService.register,
    onSuccess: () => {
      router.push('/');
    },
    onError: (err) => {},
  });

  return { mutate, isPending, isError, error };
}
