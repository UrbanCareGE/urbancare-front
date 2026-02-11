'use client';

import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/model/common.dto';
import { AuthService } from '@/service/auth-service';
import { useFormContext } from 'react-hook-form';

export function useOtp() {
  const { getValues, trigger, setError } = useFormContext();

  const { mutate, isPending, error } = useMutation<
    string,
    ErrorResponse,
    string
  >({
    mutationFn: AuthService.generateOtp,
    onSuccess: (data) => {},
    onError: (err) => {
      console.log(err);
    },
  });

  const handleGetOtp = async () => {
    const phone = getValues('phone');

    const isValid = await trigger('phone');
    if (!isValid) return;

    if (!phone) {
      setError('phone', {
        type: 'manual',
        message: 'გთხოვთ შეიყვანოთ ტელეფონი',
      });
      return;
    }

    mutate(phone);
  };

  return { mutate, isPending, error, handleGetOtp };
}
