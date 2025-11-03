'use client'

import React from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInput, FormInputWithIconWrapper} from "@/components/auth/FormInput";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {OauthForm} from "@/components/auth/OauthForm";
import {useLogin} from "@/hooks/query/use-login";
import {KeyRound, PhoneIcon} from "lucide-react";
import {AuthSpacer} from "@/components/auth/AuthSpacer";

export function LoginForm() {
    const {form, onSubmit, isPending} = useLogin();

    return (
        <Form {...form}>
            <form className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl className={"w-full"}>
                                <FormInputWithIconWrapper icon={<PhoneIcon/>}>
                                    <FormInput className={"w-full"}
                                               placeholder="მობილურის ნომერი*"
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
                                    <FormInput className={"w-full"}
                                               placeholder="პაროლი*"
                                               type="password"
                                               isPasswordType
                                               disabled={isPending}
                                               {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className={"w-full flex justify-end"}>
                    <Link href={"/"}
                          className={"text-base inline text-text-placeholder font-semibold text-end underline"}>
                        პაროლის აღდგენა
                    </Link>
                    <AuthSpacer/>
                </div>
                <FormInputWithIconWrapper>
                    <Button
                        className="h-12 w-full flex justify-center bg-primary rounded-3xl text-lg text-white"
                        type="submit"
                        disabled={false}
                    >
                        შესვლა
                    </Button>
                </FormInputWithIconWrapper>
                <OauthForm/>
                <label className={"text-center text-gray-500"}>
                    არ გაქვს ანგარიში?&nbsp;-&nbsp;
                    <Link href={"/auth/register"} className={"text-primary"}>
                        შექმენი
                    </Link>
                </label>
            </form>
        </Form>
    );
}