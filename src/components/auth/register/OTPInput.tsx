'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useOtp } from '@/hooks/query/auth/use-otp';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertCircle } from 'lucide-react';

type OTPInputProps = {
  icon?: React.ReactNode;
};

const OTPInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & OTPInputProps
>(({ className, type, icon, ...props }, ref) => {
  const { error: formError, formMessageId } = useFormField();
  const message = formError ? String(formError?.message ?? '') : '';
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const { mutate, isPending, error, handleGetOtp } = useOtp();

  return (
    <div className="flex w-full items-center gap-1">
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div
              className={cn(
                'w-5 h-5 flex items-center justify-center text-muted-foreground',
                { '[&_svg]:text-error': error }
              )}
            >
              {icon}
            </div>
          </div>
        )}
        <input
          type={type}
          ref={ref}
          aria-describedby={formMessageId}
          className={cn(
            'flex h-[52px] w-full rounded-xl border-[1.5px] border-border-medium bg-white text-[15px] text-text-primary placeholder:text-text-muted transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground lg:hover:border-border-hover focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 caret-black',
            { 'pl-10 pr-10': icon, 'pl-3 pr-10': !icon },
            {
              'ring-2 ring-error placeholder:text-error focus:placeholder:text-text-placeholder':
                formError,
            },
            {
              'focus:border-primary focus:ring-4 focus:ring-primary-light':
                !formError,
            },
            className
          )}
          {...props}
        />
        <TooltipProvider>
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger
              asChild
              onClick={(e) => {
                e.preventDefault();
                setTooltipOpen(!tooltipOpen);
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                setTooltipOpen(!tooltipOpen);
              }}
            >
              <div
                className={cn(
                  'absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center',
                  { 'opacity-0 pointer-events-none': !message },
                  { 'opacity-100 cursor-pointer': message }
                )}
              >
                <AlertCircle className="h-5 w-5 text-error" />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="max-w-xs bg-[var(--color-grey-800)] text-white text-sm text-center p-2"
            >
              {message}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button
        type="button"
        onClick={handleGetOtp}
        disabled={isPending}
        className="h-[52px] bg-gradient-primary text-white rounded-[14px] text-[15px] font-semibold px-4 shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] lg:hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] lg:hover:-translate-y-0.5 lg:active:translate-y-0 transition-all duration-200"
      >
        მიღება
      </Button>
    </div>
  );
});

OTPInput.displayName = 'OTPInput';

export { OTPInput };
