'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { ChevronRight, KeyRound, ShieldCheck } from 'lucide-react';
import { useSetPassword } from '@/hooks/query/user/use-set-password';
import { useGenerateOtp } from '@/hooks/query/auth/use-otp';
import { useAuth } from '@/components/provider/AuthProvider';
import { useTranslation } from '@/i18n';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ChangePasswordForm() {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { mutateAsync: setPassword, isPending: isSettingPassword } =
    useSetPassword();
  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useGenerateOtp();

  const setPasswordSchema = z
    .object({
      otp: z.string().min(1, t.authValidation.invalidCode),
      newPassword: z.string().min(8, t.profileValidation.passwordMinLength),
      confirmPassword: z
        .string()
        .min(8, t.profileValidation.passwordMinLength),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t.profileValidation.passwordsDontMatch,
      path: ['confirmPassword'],
    });

  type SetPasswordFormData = z.infer<typeof setPasswordSchema>;

  const form = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleSendOtp = async () => {
    if (!user?.phone) return;
    try {
      await sendOtp({ phone: user.phone });
      toast.success(t.auth.otpSent);
    } catch {
      toast.error(t.common.error);
    }
  };

  const onSubmit = async (data: SetPasswordFormData) => {
    try {
      await setPassword({ otp: data.otp, newPassword: data.newPassword });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Set password error:', error);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) form.reset();
    setOpen(next);
  };

  const isPending = isSettingPassword;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'w-full urbancare-rounded-3xl overflow-hidden bg-surface-variant',
          'flex items-center gap-2 px-4 py-3 text-left',
          'shadow-sm shadow-shadow/5',
          'transition-colors duration-200 cursor-pointer',
          'lg:hover:bg-surface-hover'
        )}
      >
        <div className="w-10 h-10 urbancare-rounded-xl bg-success-container text-success-container-foreground flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="flex-1 font-semibold urbancare-text-base text-text-primary leading-tight-georgian truncate">
          {t.profile.changePassword}
        </h3>
        <ChevronRight className="w-5 h-5 text-text-tertiary shrink-0" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="border-border bg-surface max-w-lg p-0 overflow-hidden gap-0">
          <DialogTitle></DialogTitle>
          <div className="px-4 py-3 bg-surface-variant border-b border-border flex items-center gap-2">
            <div className="w-10 h-10 urbancare-rounded-xl bg-success-container text-success-container-foreground flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold urbancare-text-base text-text-primary leading-tight-georgian">
              {t.profile.changePassword}
            </h3>
          </div>
          <div className="p-4 sm:p-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <div className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <FormInput
                            placeholder={t.auth.otpCode}
                            type="text"
                            inputMode="numeric"
                            disabled={isPending}
                            className="bg-surface-variant border-border hover:border-border-hover focus-visible:border-border-focus"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || !user?.phone}
                    variant="outline"
                    className="h-10 px-4 urbancare-rounded-lg shrink-0"
                  >
                    {isSendingOtp ? t.common.sending : t.auth.sendCode}
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInput
                          placeholder={t.profile.newPassword}
                          type="password"
                          icon={<KeyRound />}
                          isPasswordType={true}
                          disabled={isPending}
                          className="bg-surface-variant border-border hover:border-border-hover focus-visible:border-border-focus"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormInput
                          placeholder={t.profile.repeatPassword}
                          type="password"
                          icon={<KeyRound />}
                          isPasswordType={true}
                          disabled={isPending}
                          className="bg-surface-variant border-border hover:border-border-hover focus-visible:border-border-focus"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 urbancare-rounded-lg disabled:bg-disabled disabled:text-disabled-foreground"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? t.common.inProgress : t.profile.changePassword}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
