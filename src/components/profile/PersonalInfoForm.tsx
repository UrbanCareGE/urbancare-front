'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import { useUpdateProfile } from '@/hooks/query/user/use-update-profile';
import { useTranslation } from '@/i18n';

export function PersonalInfoForm() {
  const t = useTranslation();
  const { user } = useAuth();
  const { mutateAsync, isPending } = useUpdateProfile();

  const personalInfoSchema = z.object({
    name: z.string().min(2, t.profileValidation.nameMinLength),
    surname: z.string().min(2, t.profileValidation.surnameMinLength),
  });

  type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name || '',
      surname: user.surname || '',
    },
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  return (
    <div className="w-full space-y-3">
      <h3 className="text-urbancare-2xl font-semibold text-text-primary">
        {t.profile.personalInfo}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormInput
                    placeholder={t.profile.namePlaceholder}
                    icon={<User />}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormInput
                    placeholder={t.profile.surnamePlaceholder}
                    icon={<User />}
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
            disabled={isPending || !form.formState.isDirty}
          >
            {isPending ? t.common.inProgress : t.common.save}
          </Button>
        </form>
      </Form>
    </div>
  );
}
