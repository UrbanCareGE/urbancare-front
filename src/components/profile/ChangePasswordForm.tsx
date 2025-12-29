"use client"

import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInput} from "@/components/common/input/FormInput";
import {Button} from "@/components/ui/button";
import {KeyRound, Lock} from 'lucide-react';
import {useChangePassword} from '@/hooks/query/user/use-change-password';

const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს'),
    newPassword: z.string().min(6, 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს'),
    confirmPassword: z.string().min(6, 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'პაროლები არ ემთხვევა',
    path: ['confirmPassword'],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
    const {changePassword, isPending} = useChangePassword();

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
            await changePassword({
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
            <h3 className="text-lg font-semibold">პაროლის შეცვლა</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <FormInput
                                        placeholder="ძველი პაროლი*"
                                        type="password"
                                        icon={<Lock/>}
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
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <FormInput
                                        placeholder="ახალი პაროლი*"
                                        type="password"
                                        icon={<KeyRound/>}
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
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <FormInput
                                        placeholder="გაიმეორეთ პაროლი*"
                                        type="password"
                                        icon={<KeyRound/>}
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
                        className="w-full h-12 bg-primary text-white rounded-3xl"
                        disabled={isPending || !form.formState.isDirty}
                    >
                        {isPending ? 'მიმდინარეობს...' : 'პაროლის შეცვლა'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}