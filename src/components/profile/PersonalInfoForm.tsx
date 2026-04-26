'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { User, UserRound } from 'lucide-react';
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
      form.reset(data);
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  return (
    <section className="w-full urbancare-rounded-3xl overflow-hidden border-none bg-surface shadow-sm shadow-shadow/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <header className="px-4 py-3 bg-surface-variant border-b border-border flex items-center gap-2">
            <div className="w-10 h-10 urbancare-rounded-xl bg-primary-container text-primary-container-foreground flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <h3 className="flex-1 font-semibold urbancare-text-base text-text-primary leading-tight-georgian truncate">
              {t.profile.personalInfo}
            </h3>
            <Button
              type="submit"
              size="sm"
              className="h-9 px-4 urbancare-rounded-lg urbancare-text-sm font-medium disabled:bg-disabled disabled:text-disabled-foreground shrink-0"
              disabled={isPending || !form.formState.isDirty}
            >
              {isPending ? t.common.inProgress : t.common.save}
            </Button>
          </header>
          <div className="p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <FormInput
                        placeholder={t.profile.namePlaceholder}
                        icon={<User />}
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
                name="surname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <FormInput
                        placeholder={t.profile.surnamePlaceholder}
                        icon={<UserRound />}
                        disabled={isPending}
                        className="bg-surface-variant border-border hover:border-border-hover focus-visible:border-border-focus"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
