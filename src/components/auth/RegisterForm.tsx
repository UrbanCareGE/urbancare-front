"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import FadeContent from "@/components/FadeContent";
import {KeyRound, RotateCcwKey, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";

export interface RegisterFormProps {
    onCompleteAction: () => void;
}

const formSchema = z
    .object({
        emailOrPhone: z
            .string()
            .refine(
                (val) =>
                    /^[a-zA-Z0-9._%+-]{3,32}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) ||
                    /^\+?[1-9]\d{7,14}$/.test(val),
                {
                    message: "გთხოვთ შეიყვანოთ ელ-ფოსტა ან ტელეფონი",
                }
            ),
        password: z.string().min(6, {message: "პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან."}),
        confirmPassword: z.string().min(6, {message: "გამეორებული პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან"}),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "გთხოვთ დაეთანხმოთ წესებსა და პირობებს",
        }),
        acceptConfidential: z.boolean().refine((val) => val === true, {
            message: "გთხოვთ დაეთანხმოთ კონფიდენციალურობის პოლიტიკას",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "გთხოვთ, დარწმუნდეთ, რომ პაროლები ერთმანეთს ემთხვევა.",
        path: ["confirmPassword"],
    });

export function RegisterForm({onCompleteAction}: RegisterFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailOrPhone: "",
            password: "",
            confirmPassword: "",
        },
    });

    // const {mutate, isPending, error} = useMutation<ServerResponse<RegisterRes>, Error, RegisterReq>({
    //     mutationFn: AuthService.register,
    //     onSuccess: (data) => {
    //         const userId: number = data?.data.userId;
    //         console.log("aee")
    //         router.push(`/register/confirm/?userId=${userId}`);
    //     },
    // });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const {confirmPassword, ...registerData} = values;
        // mutate(registerData);
        onCompleteAction()
    };

    return (
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
            <Form {...form}>
                <form className="flex flex-col items-center gap-4 w-[456px] p-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="emailOrPhone"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className={"flex items-center justify-between w-full gap-2"}>
                                        <div className={"flex justify-center items-center w-8 h-full"}>
                                            <User/>
                                        </div>
                                        <Input className={"w-full"}
                                               placeholder="ელ.ფოსტა ან ტელეფონი"
                                               disabled={false}
                                               {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
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
                                        <Input className={"w-full"}
                                               placeholder="პაროლი"
                                               disabled={false}
                                               {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
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
                                        <Input className={"w-full"}
                                               placeholder="გაიმეორეთ პაროლი"
                                               disabled={false}
                                               {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}

                    />

                    {/* Error Message */}
                    {/*{error && <Label>{error.message}</Label>}*/}

                    <div className={"flex w-full flex-col justify-center gap-2"}>
                        <FormField
                            control={form.control}
                            name="acceptTerms"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className={"flex items-center justify-start w-full gap-2"}>
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
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="acceptConfidential"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className={"flex items-center justify-start w-full gap-2"}>
                                            <div className={"flex justify-center items-center w-8 h-full"}>
                                            </div>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked)}
                                            />
                                            <Label className="text-xs">
                                                ვეთანხმები{" "}
                                                <span
                                                    className="font-semibold underline text-text-primary-light dark:text-text-primary-dark ml-1"> კონფიდენციუალლურობის პოლიტიკას</span>
                                            </Label>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>

                    <Button
                        className="w-full flex justify-center bg-primary rounded-3xl text-lg text-white"
                        type="submit"
                        disabled={false}
                    >
                        დადასტურება
                    </Button>
                </form>
            </Form>
        </FadeContent>
    );
}