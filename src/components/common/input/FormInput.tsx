import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from '@/components/ui/form';
import { AlertCircle, EyeIcon, EyeOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type FormInputProps = {
  isPasswordType?: boolean;
  icon?: React.ReactNode;
};

const FormInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & FormInputProps
>(({ className, type, icon, isPasswordType = false, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  if (type === 'password' && showPassword) {
    type = 'text';
  }
  const { error, formMessageId } = useFormField();
  const message = error ? String(error?.message ?? '') : '';
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  return (
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
          'flex h-12 sm:h-12 w-full rounded-md border border-input-border bg-input py-1 text-sm sm:text-base shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-placeholder focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 caret-black',
          { 'pl-10 pr-10': icon, 'pl-3 pr-10': !icon },
          {
            'ring-2 ring-error placeholder:text-error focus:placeholder:text-text-placeholder':
              error,
          },
          { 'focus-visible:ring-2 focus-visible:ring-primary': !error },
          className
        )}
        {...props}
      />

      {!error && isPasswordType && type == 'password' && (
        <div
          className={
            'absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer'
          }
          onClick={() => setShowPassword(!showPassword)}
        >
          <EyeIcon className={'w-5 h-5 sm:w-6 sm:h-6'} />
        </div>
      )}

      {!error && isPasswordType && type == 'text' && (
        <div
          className={
            'absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer'
          }
          onClick={() => setShowPassword(!showPassword)}
        >
          <EyeOff className={'w-5 h-5 sm:w-6 sm:h-6'} />
        </div>
      )}

      <TooltipProvider>
        <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
          <TooltipTrigger
            asChild
            onClick={(e) => {
              e.preventDefault();
              setTooltipOpen(!tooltipOpen);
            }}
            onMouseEnter={(e) => {
              e.preventDefault();
              setTooltipOpen(!tooltipOpen);
            }}
          >
            <div
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center',
                !message
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 cursor-pointer'
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
  );
});

FormInput.displayName = 'FormInput';

export { FormInput };
