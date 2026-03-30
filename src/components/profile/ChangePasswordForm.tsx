'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { KeyRound, Lock } from 'lucide-react';
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
    <div className="w-full space-y-3">
      <h3 className="text-urbancare-2xl font-semibold">
        {t.profile.changePassword}
      </h3>
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
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-12 bg-primary text-text-primary rounded-urbancare-4xl disabled:text-disabled-foreground disabled:bg-disabled"
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? t.common.inProgress : t.profile.changePassword}
          </Button>
        </form>
      </Form>
    </div>
  );
}
