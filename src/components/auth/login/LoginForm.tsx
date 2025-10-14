'use client'

import React from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInput, FormInputWithIconWrapper} from "@/components/auth/FormInput";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {OauthForm} from "@/components/auth/OauthForm";
import {useLogin} from "@/hooks/use-login";
import {KeyRound, User} from "lucide-react";

export function LoginForm() {
    const {mutate, form, onSubmit, isPending, error} = useLogin();

    return (
        <Form {...form}>
            <form className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="emailOrPhone"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl className={"w-full"}>
                                <FormInputWithIconWrapper icon={<User/>}>
                                    <FormInput className={"w-full"}
                                               placeholder="ელ.ფოსტა ან ტელეფონი*"
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
                                               disabled={isPending}
                                               {...field}
                                    />
                                </FormInputWithIconWrapper>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Link href={"/"} className={"text-base inline text-gray-800 font-bold text-end"}>
                    პაროლის აღდგენა
                </Link>
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