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
import {KeyRound, RotateCcwKey, User, VenusAndMars} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {signIn} from "next-auth/react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";

export interface RegisterFormProps {
    onCompleteAction: () => void;
}

const formSchema = z
    .object({
        firstName: z.string()
            .min(2, {message: "სახელი უნდა შედგებოდეს მინიმუმ 2 ასოსგან"}),
        lastName: z.string()
            .min(2, {message: "გვარი უნდა შედგებოდეს მინიმუმ 2 ასოსგან"}),
        birthYear: z
            .string()
            .refine((val) => /^\d{4}$/.test(val), {message: "გთხოვთ შეიყვანოთ სწორი წელი"})
            .refine((val) => {
                const year = parseInt(val, 10);
                return year >= 1900 && year <= new Date().getFullYear();
            }, {message: `დაბადების წელი უნდა იყოს 1900 და ${new Date().getFullYear()} შორის`}),
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
        gender: z.enum(["male", "female"])
            .refine((val) => !!val, {
                message: "გთხოვთ აირჩიეთ ყლე გაქვთ თუ მუტელი",
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
            firstName: "",
            lastName: "",
            emailOrPhone: "",
            birthYear: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
            gender: "male"
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
                <form className="flex flex-col justify-start w-full gap-1" onSubmit={form.handleSubmit(onSubmit)}>
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
                                            <Input className={"w-full"}
                                                   placeholder="სახელი*"
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
                            name="lastName"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormControl className={"w-full"}>
                                        <div className={"flex items-center justify-between w-full gap-2"}>
                                            <Input className={"w-full"}
                                                   placeholder="გვარი*"
                                                   disabled={false}
                                                   {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
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
                                        <div className={"flex justify-center items-center w-8 h-full"}/>
                                        <Input className={"w-full"}
                                               placeholder="ელ.ფოსტა ან ტელეფონი*"
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
                        name="birthYear"
                        render={({field}) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <div className={"flex items-center justify-between w-full gap-2"}>
                                            <div className={"flex justify-center items-center w-8 h-full"}/>
                                            <SelectTrigger className={"text-muted-foreground"}>
                                                <SelectValue placeholder="აირჩიეთ დაბადების წელი*"/>
                                            </SelectTrigger>
                                        </div>
                                    </FormControl>
                                    <SelectContent className={"opacity-100 h-64 shadow-2xl border bg-white"}>
                                        {Array.from({length: 2025 - 1900 + 1}, (_, i) => 1900 + i).map((year) => (
                                            <SelectItem
                                                className={"w-full bg-white hover:bg-gray-100 max-h-64 overflow-y-scroll"}
                                                key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
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
                                        <div className={"flex flex-col w-full gap-4 pl-2"}>
                                            <Label className={"text-gray-500"} htmlFor="სქესი*">სქესი*</Label>
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
                                               placeholder="პაროლი*"
                                               type="password"
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
                                               placeholder="გაიმეორეთ პაროლი*"
                                               type="password"
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
                                <FormMessage/>
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
                    <div className="flex gap-3 w-full justify-center mt-[0.8rem] border-t pt-4">
                        <Button
                            variant="outline"
                            onClick={() => signIn("google")}
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            <FacebookIcon className="w-5 h-5"/>
                            Google
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => signIn("facebook")}
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            <GoogleIcon dimension={30}/>
                            Facebook
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => signIn(" apple")}
                            className=" flex-1 flex items-center justify-center gap-2"
                        >
                            <AppleIcon dimension={30}/>
                            Apple
                        </Button>
                    </div>
                </form>
            </Form>
        </FadeContent>
    );
}