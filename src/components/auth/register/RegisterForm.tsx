"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {BadgeCheck, KeyRound, Mail, RotateCcwKey, User, VenusAndMars} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import {registerSchema} from "@/components/auth/register/data/register-form-schema";
import {FormInput} from "@/components/auth/FormInput";
import {AuthService} from "@/service/auth-service";
import {useMutation} from "@tanstack/react-query";
import {ErrorResponse} from "@/model/common";
import {OTPInput} from "@/components/auth/register/OTPInput";
import Link from "next/link";

export function RegisterForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            emailOrPhone: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
            gender: "male",
            otp: ""
        },
    });

    const {mutate, isPending, error} = useMutation<
        string,                            // success type
        ErrorResponse,                     // error type
        RegisterReq                        // payload type
    >({
        mutationFn: AuthService.register,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err)
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        const registerReq: RegisterReq = {
            name: values.firstName,
            surname: values.lastName,
            password: values.password,
            phone: values.emailOrPhone,
            otp: values.otp,
        }
        mutate(registerReq);
    };

    return (
        <Form {...form}>
            <form className="flex flex-col justify-start w-full gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"flex justify-between items-center gap-4"}>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl className={"w-full"}>
                                    <div className={"flex items-center justify-between w-full gap-2"}>
                                        <div className={"flex justify-center items-center w-8 h-full"}>
                                            <User/>
                                        </div>
                                        <FormInput className={"w-full"}
                                                   placeholder="სახელი*"
                                                   disabled={false}
                                                   {...field}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl className={"w-full"}>
                                    <div className={"flex items-center justify-between w-full gap-2"}>
                                        <FormInput className={"w-full"}
                                                   placeholder="გვარი*"
                                                   disabled={false}
                                                   {...field}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="emailOrPhone"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl className={"w-full"}>
                                <div className={"flex items-center justify-between w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <Mail/>
                                    </div>
                                    <FormInput className={"w-full"}
                                               placeholder="ელ.ფოსტა ან ტელეფონი*"
                                               disabled={false}
                                               {...field}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className={"flex w-full"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <VenusAndMars/>
                                    </div>
                                    <div className={"flex w-full gap-4 pl-2"}>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex gap-6"
                                        >
                                            <div className="flex justify-start items-center gap-2">
                                                <RadioGroupItem value="male" id="male"/>
                                                <Label htmlFor="male">მამრობითი</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="female" id="female"/>
                                                <Label htmlFor="female">მდედრობითი</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
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
                                <div className={"flex items-center justify-between w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <KeyRound/>
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

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className={"flex items-center justify-between w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <RotateCcwKey/>
                                    </div>
                                    <FormInput className={"w-full"}
                                               placeholder="გაიმეორეთ პაროლი*"
                                               type="password"
                                               disabled={false}
                                               {...field}
                                    />
                                </div>
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
                                <div className={"flex items-center justify-between w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                        <BadgeCheck className={"stroke-black"}/>
                                    </div>
                                    <OTPInput className={"w-full"}
                                              placeholder="დამადასტურებელი კოდი"
                                              type="text"
                                              disabled={isPending}
                                              {...field}
                                    />
                                </div>
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
                                <div className={"flex items-center w-full gap-2"}>
                                    <div className={"flex justify-center items-center w-8 h-full"}>
                                    </div>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                    <Label className="text-xs">
                                        ვეთანხმები{" "}
                                        <span
                                            className="font-semibold underline text-text-primary-light dark:text-text-primary-dark ml-1">   წესებსა და პირობებს</span>
                                    </Label>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className={"flex w-full"}>
                    <div className={"flex justify-center items-center w-8 h-full"}/>
                    <Button
                        className="w-full flex justify-center bg-primary rounded-3xl text-lg text-white"
                        type="submit"
                        disabled={false}
                    >
                        დადასტურება
                    </Button>
                </div>
                <div className="flex gap-3 w-full justify-center">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={async () => {
                            // await AuthService.googleOauth();
                            router.push("https://ivette-nonpropagable-dialectically.ngrok-free.dev/auth/google")
                        }}
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <GoogleIcon dimension={30}/>
                        Google
                    </Button>

                    <Button
                        variant="outline"
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        <FacebookIcon dimension={30}/>
                        Facebook
                    </Button>
                    <Button variant="outline"
                            type={"button"}
                            onClick={async () => console.log(await AuthService.getUser())}
                            className="flex-1 flex items-center justify-center gap-2"
                    >
                        ME
                    </Button>

                    <Button
                        variant="outline"
                        className=" flex-1 flex items-center justify-center gap-2"
                    >
                        <AppleIcon dimension={30}/>
                        Apple
                    </Button>
                </div>
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