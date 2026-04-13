'use client';

import * as React from 'react';
import { OTPInputContext } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
} from '@/components/ui/input-otp';
import { useFormField } from '@/components/ui/form';
import { cn } from '@/lib/utils';

function OtpSlot({ index, hasError }: { index: number; hasError: boolean }) {
  const ctx = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = ctx.slots[index];

  return (
    <div
      className={cn(
        'relative flex h-12 w-11 items-center justify-center bg-surface',
        'text-urbancare-xl font-semibold font-poppins',
        'rounded-urbancare-xl border',
        'shadow-sm shadow-shadow/5',
        'transition-all duration-200',
        // Default empty
        !isActive && !char && !hasError &&
          'border-input-border text-text-muted',
        // Filled
        !isActive && char && !hasError &&
          'border-border-strong text-text-primary bg-surface',
        // Active
        isActive && !hasError &&
          'border-input-border-focus ring-2 ring-primary/15 text-text-primary bg-surface z-10',
        // Error (any state)
        hasError && !isActive &&
          'border-input-border-error text-text-primary ring-2 ring-error/10',
        hasError && isActive &&
          'border-input-border-error text-text-primary ring-2 ring-error/15 z-10',
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
      <div className="inline-flex items-center gap-2 rounded-urbancare-2xl border border-border bg-surface-container px-4 py-3 shadow-sm shadow-shadow/5">
        <InputOTP
          ref={ref}
          maxLength={6}
          value={value as string | undefined}
          onChange={onChange as ((value: string) => void) | undefined}
          disabled={disabled}
          containerClassName="flex items-center gap-2 has-[:disabled]:opacity-40"
        >
          <InputOTPGroup className="flex items-center gap-x-2">
            {Array.from({ length: 6 }, (_, i) => (
              <OtpSlot key={i} index={i} hasError={hasError} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
});

FormOtpInput.displayName = 'FormOtpInput';
