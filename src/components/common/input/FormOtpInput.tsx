'use client';

import * as React from 'react';
import { OTPInputContext } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useFormField } from '@/components/ui/form';
import { cn } from '@/lib/utils';

function OtpSlot({ index, hasError }: { index: number; hasError: boolean }) {
  const ctx = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = ctx.slots[index];

  return (
    <div
      className={cn(
        'relative flex h-12 w-5 items-center justify-center',
        'text-urbancare-xl font-semibold',
        'border-b-2 rounded-none bg-transparent',
        'transition-all duration-200',
        // Default empty
        !isActive && !char && !hasError && 'border-border text-text-muted',
        // Filled
        !isActive &&
          char &&
          !hasError &&
          'border-text-primary text-text-primary',
        // Active
        isActive && !hasError && 'border-primary text-text-primary',
        // Error
        hasError && 'border-error text-text-primary'
      )}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-caret-blink bg-primary duration-1000" />
        </div>
      )}
    </div>
  );
}

type FormOtpInputProps = {
  icon?: React.ReactNode;
};

export const FormOtpInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & FormOtpInputProps
>(({ type, icon, value, onChange, disabled, ...props }, ref) => {
  const { error } = useFormField();
  const hasError = Boolean(error);

  return (
    <div className="flex items-center justify-center">
      <InputOTP
        ref={ref}
        maxLength={6}
        value={value as string | undefined}
        onChange={onChange as ((value: string) => void) | undefined}
        disabled={disabled}
        containerClassName="flex items-center gap-2 has-[:disabled]:opacity-50"
      >
        <InputOTPGroup className="flex items-center gap-x-2">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
});

FormOtpInput.displayName = 'FormOtpInput';
