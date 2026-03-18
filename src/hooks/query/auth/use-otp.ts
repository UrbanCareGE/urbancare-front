'use client';

import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/service/auth-service';
import { ErrorResponse } from '@/model/dto/common.dto';
import { GenerateOtpDTO } from '@/model/dto/auth.dto';

export function useOtp() {
  return useMutation<void, ErrorResponse, GenerateOtpDTO>({
    mutationFn: AuthService.generateOtp,
    onSuccess: (data) => {},
    onError: (err) => {
      console.log(err);
    },
  });
}
