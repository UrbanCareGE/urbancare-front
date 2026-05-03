'use client';

import * as React from 'react';
import { OTPInputContext } from 'input-otp';
import { InputOTP, InputOTPGroup } from '@/components/ui/input-otp';
import { useFormField } from '@/components/ui/form';
import { cn } from '@/lib/utils';

function OtpSlot({ index, hasError }: { index: number; hasError: boolean }) {
  const ctx = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = ctx.slots[index];

  return (
    <div
      className={cn(
        'relative flex items-center justify-center transition-all duration-150',
        'h-12 w-12 sm:h-[52px] sm:w-[52px]',
        'urbancare-rounded-xl',
        'urbancare-text-5xl font-semibold font-poppins',
        // Default empty
        !isActive && !char && !hasError && 'bg-background border border-white/[0.06] text-text-tertiary',
        // Filled
        !isActive && char && !hasError && 'bg-surface-elevated border border-white/[0.06] text-text-primary',
        // Active
        isActive && !hasError &&
          'bg-surface-elevated border-2 border-primary text-text-primary z-10',
        // Error states
        hasError && !isActive && 'bg-background border border-error/60 text-text-primary',
        hasError && isActive && 'bg-surface-elevated border-2 border-error text-text-primary z-10'
      )}
      style={
        isActive
          ? {
              boxShadow: hasError
                ? '0 0 0 4px rgba(248,113,113,0.18)'
                : '0 0 0 4px rgba(45,136,255,0.18)',
            }
          : undefined
      }
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-px animate-caret-blink bg-primary duration-1000" />
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
    <div className="flex items-center justify-center w-full">
      <InputOTP
        ref={ref}
        maxLength={6}
        value={value as string | undefined}
        onChange={onChange as ((value: string) => void) | undefined}
        disabled={disabled}
        containerClassName="flex items-center gap-2 sm:gap-2.5 has-[:disabled]:opacity-40"
      >
        <InputOTPGroup className="flex items-center gap-2 sm:gap-2.5">
          {Array.from({ length: 6 }, (_, i) => (
            <OtpSlot key={i} index={i} hasError={hasError} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
});

FormOtpInput.displayName = 'FormOtpInput';
