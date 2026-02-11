'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { User, Loader2 } from 'lucide-react';
import { useAuth } from '@/components/provider/AuthProvider';
import { useUpdateProfile } from '@/hooks/query/user/use-update-profile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'სახელი უნდა შედგებოდეს მინიმუმ 2 ასოსგან' }),
  surname: z
    .string()
    .min(2, { message: 'გვარი უნდა შედგებოდეს მინიმუმ 2 ასოსგან' }),
});

export function ProfileCompletionModal() {
  const { user, isAuthenticated } = useAuth();
  const { updateProfile, isPending } = useUpdateProfile();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      surname: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if name or surname is missing/empty
      const needsCompletion =
        !user.name ||
        !user.surname ||
        user.name.trim() === '' ||
        user.surname.trim() === '';
      setIsOpen(needsCompletion);

      // Pre-fill form if values exist
      if (user.name) form.setValue('name', user.name);
      if (user.surname) form.setValue('surname', user.surname);
    }
  }, [user, isAuthenticated]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateProfile(values);
      setIsOpen(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="w-11/12 rounded-panel"
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing by clicking outside
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            დაასრულე პროფილი
          </DialogTitle>
          <DialogDescription className="text-secondary">
            გთხოვთ შეავსოთ თქვენი სახელი და გვარი
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
                      placeholder="სახელი"
                      disabled={isPending}
                      icon={<User className="text-gray-600" />}
                      className="rounded-xl border-[1.5px] border-border-medium bg-white text-[15px] text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
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
                      placeholder="გვარი"
                      disabled={isPending}
                      icon={<User className="text-gray-600" />}
                      className="rounded-xl border-[1.5px] border-border-medium bg-white text-[15px] text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
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
                className="flex-1 rounded-panel border-[1.5px] border-border-medium text-[15px] font-semibold bg-error-container/70 text-error"
              >
                მოგვიანებით
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 rounded-panel bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-white text-[15px] font-semibold relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    დაელოდეთ
                  </>
                ) : (
                  'შენახვა'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
