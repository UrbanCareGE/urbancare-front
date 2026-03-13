'use client';

import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/model/dto/common.dto';
import { AuthService } from '@/service/auth-service';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/i18n';

export function useOtp() {
  const t = useTranslation();
  const { getValues, trigger, setError } = useFormContext();

  const { mutate, isPending, error } = useMutation<void, ErrorResponse, string>(
    {
      mutationFn: AuthService.generateOtp,
      onSuccess: (data) => {},
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleGetOtp = async () => {
    const phone = getValues('phone');

    const isValid = await trigger('phone');
    if (!isValid) return;

    if (!phone) {
      setError('phone', {
        type: 'manual',
        message: t.authValidation.enterPhone,
      });
      return;
    }

    mutate(phone);
  };

  return { mutate, isPending, error, handleGetOtp };
}
