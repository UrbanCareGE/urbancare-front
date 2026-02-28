'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  BadgeCheck,
  KeyRound,
  Loader2,
  PhoneIcon,
  RotateCcw,
  UserIcon,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormInput } from '@/components/common/input/FormInput';
import { OTPInput } from '@/components/auth/register/OTPInput';
import { RegisterDTO } from '@/model/dto/auth.dto';
import { registerSchema } from '@/components/auth/register/data/register-form-schema';
import { useRegister } from '@/hooks/query/auth/use-register';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { OauthForm } from '@/components/auth/oauith/OauthForm';

const Separator = () => {
  return (
    <div className="flex items-center gap-4 my-4">
      <div className="flex-1 h-px bg-text-muted" />
      <span className="text-text-muted text-xs font-medium uppercase tracking-wide">
        or
      </span>
      <div className="flex-1 h-px bg-text-muted" />
    </div>
  );
};

export function RegisterFormCard() {
  const { mutate, isPending } = useRegister();

  const handleOAuthLogin = (provider: string) => {
    // Handle OAuth registration
  };

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
    <Card
      className={
        'border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.06)] rounded-3xl animate-slide-up'
      }
    >
      <CardContent className="p-8">
        <h1 className="text-2xl font-bold text-center text-primary mb-2">
          შექმენი ანგარიში
        </h1>
        <p className="text-center text-secondary text-base mb-7">
          შეუერთდი UrbanCare-ს
        </p>

        {/* OAuth Buttons */}
        {/*<OauthForm handleOauthLogin={handleOAuthLogin} />*/}

        {/* Divider */}
        {/*<Separator />*/}

        {/* Registration Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder="სახელი"
                      disabled={isPending}
                      icon={<UserIcon className="text-icon" />}
                      className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-[rgb(var(--color-surface))] text-[15px] text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
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
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder="გვარი"
                      disabled={isPending}
                      icon={<UserIcon className="text-icon" />}
                      className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-[rgb(var(--color-surface))] text-[15px] text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder="ტელეფონი"
                      disabled={isPending}
                      icon={
                        <PhoneIcon className="text-[rgb(var(--color-icon))]" />
                      }
                      className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-[rgb(var(--color-surface))] text-[15px] text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder="პაროლი"
                      icon={
                        <KeyRound className="text-[rgb(var(--color-icon))]" />
                      }
                      type="password"
                      isPasswordType
                      disabled={isPending}
                      className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-[rgb(var(--color-surface))] text-[15px] text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder="გაიმეორეთ პაროლი"
                      icon={
                        <RotateCcw className="text-[rgb(var(--color-icon))]" />
                      }
                      type="password"
                      isPasswordType
                      disabled={isPending}
                      className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-[rgb(var(--color-surface))] text-[15px] text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* OTP Input */}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OTPInput
                      placeholder="ერთჯერადი კოდი"
                      type="text"
                      icon={
                        <BadgeCheck className="text-[rgb(var(--color-icon))]" />
                      }
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Accept Terms */}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2 py-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        disabled={isPending}
                      />
                      <Label className="text-[13px] cursor-pointer text-text-secondary">
                        ვეთანხმები{' '}
                        <Link
                          href="/terms"
                          className="font-semibold text-primary lg:hover:text-primary-dark transition-colors"
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-[52px] rounded-[14px] bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] lg:hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] lg:hover:-translate-y-0.5 lg:active:translate-y-0 transition-all duration-200 text-white text-base font-semibold relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  დაელოდეთ
                </>
              ) : (
                'რეგისტრაცია'
              )}
            </Button>
          </form>
        </Form>

        <div className={'text-center py-6 animate-slide-up'}>
          <p className="text-text-secondary text-sm">
            უკვე გაქვთ ანგარიში?{' '}
            <Link
              href="/auth/login"
              className="text-primary font-semibold lg:hover:text-primary-dark transition-colors"
            >
              შესვლა
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
