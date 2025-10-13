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
import {OauthForm} from "@/components/auth/OauthForm";

const IconWrapper = ({children}: { children: React.ReactNode }) => (
    <div className="flex justify-center items-center w-8 shrink-0">
        {children}
    </div>
);

const FormFieldWithIcon = ({
                               icon,
                               children
                           }: {
    icon?: React.ReactNode;
    children: React.ReactNode
}) => (
    <div className="flex items-center gap-2 w-full">
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {!icon && <div className="w-8 shrink-0"/>}
        {children}
    </div>
);

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

    const {mutate, isPending} = useMutation<
        string,                            // success type
        ErrorResponse,                     // error type
        RegisterReq                        // payload type
    >({
        mutationFn: AuthService.register,
        onSuccess: () => {
            router.push("/");
        },
        onError: (err) => {
            // Handle error appropriately - could show toast notification
            // For now, the FormInput component will show field-level errors
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <FormFieldWithIcon icon={<User/>}>
                                        <FormInput
                                            placeholder="სახელი*"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormFieldWithIcon>
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
                                    <FormFieldWithIcon icon={<User/>}>
                                        <FormInput
                                            placeholder="გვარი*"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormFieldWithIcon>
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
                            <FormControl>
                                <FormFieldWithIcon icon={<Mail/>}>
                                    <FormInput
                                        placeholder="ელ.ფოსტა ან ტელეფონი*"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormFieldWithIcon>
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
                                <FormFieldWithIcon icon={<VenusAndMars/>}>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row gap-4"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="male" id="male"/>
                                            <Label htmlFor="male">მამრობითი</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="female" id="female"/>
                                            <Label htmlFor="female">მდედრობითი</Label>
                                        </div>
                                    </RadioGroup>
                                </FormFieldWithIcon>
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
                                <FormFieldWithIcon icon={<KeyRound/>}>
                                    <FormInput
                                        placeholder="პაროლი*"
                                        type="password"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormFieldWithIcon>
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
                                <FormFieldWithIcon icon={<RotateCcwKey/>}>
                                    <FormInput
                                        placeholder="გაიმეორეთ პაროლი*"
                                        type="password"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormFieldWithIcon>
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
                                <FormFieldWithIcon icon={<BadgeCheck className="stroke-black"/>}>
                                    <OTPInput
                                        placeholder="ერთჯერადი კოდი*"
                                        type="text"
                                        disabled={isPending}
                                        {...field}
                                    />
                                </FormFieldWithIcon>
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
                                <FormFieldWithIcon>
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
                                </FormFieldWithIcon>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormFieldWithIcon>
                    <Button
                        className="w-full flex justify-center bg-primary rounded-3xl text-base sm:text-lg text-white"
                        type="submit"
                        disabled={isPending}
                    >
                        დადასტურება
                    </Button>
                </FormFieldWithIcon>
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