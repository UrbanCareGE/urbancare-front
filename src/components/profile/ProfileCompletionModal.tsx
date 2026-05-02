'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { Loader2, User } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import { useUpdateProfile } from '@/hooks/query/user/use-update-profile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from '@/i18n';

export function ProfileCompletionModal() {
  const t = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { mutateAsync, isPending } = useUpdateProfile();

  const profileSchema = z.object({
    name: z.string().min(2, { message: t.profileValidation.nameMinLength }),
    surname: z
      .string()
      .min(2, { message: t.profileValidation.surnameMinLength }),
  });
  const needsCompletion =
    isAuthenticated &&
    !!user &&
    (!user.name?.trim() || !user.surname?.trim());
  const [dismissed, setDismissed] = useState(false);
  const isOpen = needsCompletion && !dismissed;
  const setIsOpen = (open: boolean) => {
    if (!open) setDismissed(true);
  };

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      surname: '',
    },
  });

  useEffect(() => {
    if (user?.name) form.setValue('name', user.name);
    if (user?.surname) form.setValue('surname', user.surname);
  }, [user?.name, user?.surname, form]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await mutateAsync(values);
      setIsOpen(false);
    } catch (error) {}
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-11/12 urbancare-rounded-panel"
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing by clicking outside
      >
        <DialogHeader>
          <DialogTitle className="urbancare-text-5xl font-bold text-primary">
            {t.profile.completeProfile}
          </DialogTitle>
          <DialogDescription className="text-secondary">
            {t.profile.fillNameSurname}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder={t.profile.nameInput}
                      disabled={isPending}
                      icon={<User className="text-icon" />}
                      className="urbancare-rounded-xl border-[1.5px] border-border-medium bg-surface urbancare-text-lg text-text-primary placeholder:text-text-tertiary lg:hover:border-border-hover focus:border-border-focus focus:ring-4 focus:ring-primary-container transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Surname */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder={t.profile.surnameInput}
                      disabled={isPending}
                      icon={<User className="text-icon" />}
                      className="urbancare-rounded-xl border-[1.5px] border-border-medium bg-surface urbancare-text-lg text-text-primary placeholder:text-text-tertiary lg:hover:border-border-hover focus:border-border-focus focus:ring-4 focus:ring-primary-container transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
                className="flex-1 urbancare-rounded-panel border-[1.5px] border-border-medium urbancare-text-lg font-semibold bg-error-container/70 text-error"
              >
                {t.common.later}
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 urbancare-rounded-panel bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] lg:hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] lg:hover:-translate-y-0.5 lg:active:translate-y-0 transition-all duration-200 text-white urbancare-text-lg font-semibold relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {t.common.wait}
                  </>
                ) : (
                  t.common.save
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
