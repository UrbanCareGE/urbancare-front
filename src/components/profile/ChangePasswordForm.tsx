'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { useChangePassword } from '@/hooks/query/user/use-change-password';
import { useTranslation } from '@/i18n';

export function ChangePasswordForm() {
  const t = useTranslation();
  const { mutateAsync, isPending } = useChangePassword();

  const changePasswordSchema = z
    .object({
      oldPassword: z.string().min(6, t.profileValidation.passwordMinLength),
      newPassword: z.string().min(6, t.profileValidation.passwordMinLength),
      confirmPassword: z.string().min(6, t.profileValidation.passwordMinLength),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t.profileValidation.passwordsDontMatch,
      path: ['confirmPassword'],
    });

  type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      form.reset();
    } catch (error) {
      console.error('Change password error:', error);
    }
  };

  return (
    <section className="w-full rounded-urbancare-3xl overflow-hidden border-none bg-surface shadow-sm shadow-shadow/5">
      <header className="px-4 py-3 bg-surface-variant border-b border-border flex items-center gap-2">
        <div className="w-10 h-10 rounded-urbancare-xl bg-success-container text-success-container-foreground flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="font-semibold text-urbancare-base text-text-primary leading-tight-georgian">
          {t.profile.changePassword}
        </h3>
      </header>
      <div className="p-4 sm:p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder={t.profile.oldPassword}
                      type="password"
                      icon={<Lock />}
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
              className="w-full h-12 rounded-urbancare-4xl disabled:bg-disabled disabled:text-disabled-foreground"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? t.common.inProgress : t.profile.changePassword}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
