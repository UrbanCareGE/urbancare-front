"use client"

import React from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {BadgeCheck, KeyRound, Mail, PhoneIcon, RotateCcwKey, User} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {FormInput, FormInputWithIconWrapper} from "@/components/auth/FormInput";
import {OTPInput} from "@/components/auth/register/OTPInput";
import Link from "next/link";
import {OauthForm} from "@/components/auth/OauthForm";
import {useRegister} from "@/hooks/user-register";


export function RegisterForm() {
    const {form, onSubmit, isPending} = useRegister()

    return (
        <Form {...form}>
            <form className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper icon={<User/>}>
                                    <FormInput
                                        placeholder="სახელი*"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper>
                                    <FormInput
                                        placeholder="გვარი*"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper icon={<PhoneIcon/>}>
                                    <FormInput
                                        placeholder="ტელეფონი*"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper icon={<KeyRound/>}>
                                    <FormInput
                                        placeholder="პაროლი*"
                                        type="password"
                                        disabled={isPending}
                                        isPasswordType={true}
                                        {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper icon={<RotateCcwKey/>}>
                                    <FormInput
                                        placeholder="გაიმეორეთ პაროლი*"
                                        type="password"
                                        disabled={isPending}
                                        isPasswordType={true}
                                        {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="otp"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper icon={<BadgeCheck className="stroke-black"/>}>
                                    <OTPInput
                                        placeholder="ერთჯერადი კოდი*"
                                        type="text"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <FormInputWithIconWrapper>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked)}
                                            disabled={isPending}
                                        />
                                        <Label className="text-xs sm:text-sm cursor-pointer">
                                            ვეთანხმები{" "}
                                            <Link
                                                href="/terms"
                                                className="font-semibold underline text-text-primary-light dark:text-text-primary-dark"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                წესებსა და პირობებს
                                            </Link>
                                        </Label>
                                    </div>
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormInputWithIconWrapper>
                    <Button
                        className="h-12 sm:h-12 w-full flex justify-center bg-primary rounded-3xl text-base sm:text-lg text-white"
                        type="submit"
                        disabled={isPending}
                    >
                        დადასტურება
                    </Button>
                </FormInputWithIconWrapper>

                <OauthForm/>

                <label className={"text-center text-gray-500"}>
                    არსებული ანგარიშით&nbsp;
                    <Link href={"/auth/login"} className={"text-primary"}>
                        შესვლა
                    </Link>
                </label>
            </form>
        </Form>
    );
}