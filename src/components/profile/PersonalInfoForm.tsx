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

const personalInfoSchema = z.object({
  name: z.string().min(2, 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს'),
  surname: z.string().min(2, 'გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს'),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { user } = useAuth();
  const { mutateAsync, isPending } = useUpdateProfile();

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
      <h3 className="text-lg font-semibold text-text-primary">პირადი ინფორმაცია</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormInput
                    placeholder="სახელი*"
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
                    placeholder="გვარი*"
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
            className="w-full h-12 bg-primary text-text-primary rounded-3xl disabled:text-disabled-foreground disabled:bg-disabled"
            disabled={isPending || !form.formState.isDirty}
          >
            {isPending ? 'მიმდინარეობს...' : 'შენახვა'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
