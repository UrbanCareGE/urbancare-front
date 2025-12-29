'use client'

import React from "react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInput} from "@/components/common/input/FormInput";
import {Button} from "@/components/ui/button";
import {OauthForm} from "@/components/auth/oauith/OauthForm";
import {KeyRound, PhoneIcon} from "lucide-react";
import {RecoverPasswordLink} from "@/components/auth/login/RecoverPasswordLink";
import {Spinner} from "@/components/ui/spinner";
import {LoginDTO} from "@/model/auth.dto";
import LoginFormSchema from "@/components/auth/login/data/login-form-schema";
import {useAuth} from "@/components/provider/AuthProvider";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

export function LoginForm() {
    const {logIn, isLoggingIn} = useAuth();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
        const {phone, password} = values;
        const loginReq: LoginDTO = {
            phone: phone,
            password: password,
        }
        logIn(loginReq);
    };

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
                                           disabled={isLoggingIn}
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
                                           disabled={isLoggingIn}
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
                    disabled={isLoggingIn}
                >
                    {isLoggingIn && <Spinner/>}
                    შესვლა
                </Button>
                <OauthForm/>
            </form>
        </Form>
    );
}