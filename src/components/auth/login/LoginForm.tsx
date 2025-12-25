'use client'

import React from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInput} from "@/components/auth/FormInput";
import {Button} from "@/components/ui/button";
import {OauthForm} from "@/components/auth/oauith/OauthForm";
import {useLogin} from "@/hooks/query/auth/use-login";
import {KeyRound, PhoneIcon} from "lucide-react";
import {RecoverPasswordLink} from "@/components/auth/login/common/RecoverPasswordLink";
import {Spinner} from "@/components/ui/spinner";

export function LoginForm() {
    const {form, onSubmit, isPending} = useLogin();

    return (
        <Form {...form}>
            <form className="flex flex-col justify-center items-center w-full gap-3 sm:gap-4 px-3"
                  onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl className={"w-full"}>
                                <FormInput className={"w-full"}
                                           placeholder="მობილურის ნომერი*"
                                           disabled={isPending}
                                           icon={<PhoneIcon className={"text-gray-600"}/>}
                                           {...field}
                                />
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
                                <FormInput className={"w-full"}
                                           placeholder="პაროლი*"
                                           icon={<KeyRound className={"text-gray-600"}/>}
                                           type="password"
                                           isPasswordType
                                           disabled={isPending}
                                           {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className={"w-full flex justify-end"}>
                    <RecoverPasswordLink/>
                </div>
                <Button
                    className="h-10 w-full flex justify-center bg-primary rounded-panel text-lg text-white"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending && <Spinner/>}
                    შესვლა
                </Button>
                <OauthForm/>
            </form>
        </Form>
    );
}