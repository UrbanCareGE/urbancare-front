'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  BadgeCheck,
  KeyRound,
  PhoneIcon,
  RotateCcw,
  User,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormInput } from '@/components/common/input/FormInput';
import { OTPInput } from '@/components/auth/register/OTPInput';
import Link from 'next/link';
import { OauthForm } from '@/components/auth/oauith/OauthForm';
import { useRegister } from '@/hooks/query/auth/use-register';
import { RegisterDTO } from '@/model/dto/auth.dto';
import { registerSchema } from '@/components/auth/register/data/register-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      otp: '',
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const registerReq: RegisterDTO = {
      name: values.firstName,
      surname: values.lastName,
      password: values.password,
      phone: values.phone,
      otp: values.otp,
    };
    mutate(registerReq);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4 px-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  placeholder="სახელი*"
                  disabled={isPending}
                  icon={<User />}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  placeholder="გვარი*"
                  disabled={isPending}
                  icon={<User />}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  placeholder="ტელეფონი*"
                  disabled={isPending}
                  icon={<PhoneIcon />}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  placeholder="პაროლი*"
                  type="password"
                  icon={<KeyRound />}
                  disabled={isPending}
                  isPasswordType={true}
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
            <FormItem className="w-full">
              <FormControl>
                <FormInput
                  placeholder="გაიმეორეთ პაროლი*"
                  type="password"
                  icon={<RotateCcw />}
                  disabled={isPending}
                  isPasswordType={true}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <OTPInput
                  placeholder="ერთჯერადი კოდი*"
                  type="text"
                  icon={<BadgeCheck className={'text-gray-600'} />}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    disabled={isPending}
                  />
                  <Label className="text-xs sm:text-sm cursor-pointer">
                    ვეთანხმები{' '}
                    <Link
                      href="/terms"
                      className="font-semibold underline text-text-primary-light dark:text-text-primary-dark"
                      onClick={(e) => e.stopPropagation()}
                    >
                      წესებსა და პირობებს
                    </Link>
                  </Label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className="h-12 sm:h-12 w-full flex justify-center bg-primary rounded-3xl text-base sm:text-lg text-white"
          type="submit"
          disabled={isPending}
        >
          დადასტურება
        </Button>

        <OauthForm />
      </form>
    </Form>
  );
}
