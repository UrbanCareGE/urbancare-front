'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { FormInput } from '@/components/common/input/FormInput';
import { Button } from '@/components/ui/button';
import { KeyRound, Loader2, UserIcon } from 'lucide-react';
import { LoginDTO } from '@/model/dto/auth.dto';
import LoginFormSchema from '@/components/auth/login/data/login-form-schema';
import { useAuth } from '@/components/provider/AuthProvider';
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

export function LoginFormCard() {
  const { logIn, isLoggingIn } = useAuth();

  const handleOAuthLogin = (provider: string) => {
    // Handle OAuth login
  };

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    const { phone, password } = values;
    const loginReq: LoginDTO = {
      phone: phone,
      password: password,
    };
    logIn(loginReq);
  };

  return (
    <Card className={'border-border-light rounded-3xl animate-slide-up'}>
      <CardContent className="p-8">
        <h1 className="text-2xl font-bold text-center text-primary mb-2">
          მოგესალმებით
        </h1>
        <p className="text-center text-secondary text-base mb-7">
          გაიარე ავტორიზაცია
        </p>

        {/* OAuth Buttons */}
        <OauthForm handleOauthLogin={handleOAuthLogin} />

        {/* Divider */}
        <Separator />

        {/* Email Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      placeholder="მომხმარებელი"
                      disabled={isLoggingIn}
                      icon={
                        <UserIcon className="text-[rgb(var(--color-icon))]" />
                      }
                      className="h-[52px] rounded-xl border border-border bg-surface text-[15px] text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
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
                      disabled={isLoggingIn}
                      className="h-[52px] rounded-xl border border-border bg-surface text-[15px] text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/auth/recover-password"
                className="text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                დაგავიწყდა პაროლი?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-[52px] rounded-[14px] bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-text-primary font-semibold relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  დაელოდეთ
                </>
              ) : (
                'ავტორიზაცია'
              )}
            </Button>
          </form>
        </Form>
        <div className={'text-center py-6 animate-slide-up'}>
          <p className="text-text-secondary text-sm">
            არ გაქვთ ანგარიში?{' '}
            <Link
              href="/auth/register"
              className="text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              შექმნა
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
