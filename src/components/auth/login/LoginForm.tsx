'use client'

import React from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {KeyRound, User} from "lucide-react";
import {FormInput} from "@/components/auth/FormInput";
import {Button} from "@/components/ui/button";
import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import LoginFormSchema from "@/components/auth/login/data/login-form-schema";
import {AuthService} from "@/service/auth-service";
import {ErrorResponse} from "@/model/common";
import {OauthForm} from "@/components/auth/OauthForm";

export function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            emailOrPhone: "",
            password: "",
        },
    });

    const {mutate, isPending, error} = useMutation<
        string,
        ErrorResponse,
        LoginReq
    >({
        mutationFn: AuthService.login,
        onSuccess: (data) => {
            router.push("/")
        },
        onError: (err) => {
            console.log(err)
        },
    });

    const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
        const {emailOrPhone, password} = values;
        const loginReq: LoginReq = {
            phone: emailOrPhone,
            password: password,
        }
        mutate(loginReq);
    };

    return (
        <Form {...form}>
            <form className="flex flex-col justify-center w-full gap-4 max-w-lg p-2"
                  onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="emailOrPhone"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl className={"w-full"}>
                                <div className={"flex items-center justify-between w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <User className={"stroke-black"}/>
                                    </div>
                                    <FormInput className={"w-full"}
                                               placeholder="ელ.ფოსტა ან ტელეფონი*"
                                               disabled={false}
                                               {...field}
                                    />
                                </div>
                            </FormControl>
                            {/*<FormMessage/>*/}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className={"flex items-center justify-between w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <KeyRound className={"stroke-black"}/>
                                    </div>
                                    <FormInput className={"w-full"}
                                               placeholder="პაროლი*"
                                               type="password"
                                               disabled={false}
                                               {...field}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Link href={"/signin"} className={"text-black font-bold text-end"}>
                    პაროლის აღდგენა
                </Link>
                <div className={"flex w-full"}>
                    <div className={"flex justify-center items-center w-8 h-full"}/>
                    <Button
                        className="h-12 w-full flex justify-center bg-primary rounded-3xl text-lg text-white"
                        type="submit"
                        disabled={false}
                    >
                        შესვლა
                    </Button>
                </div>
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