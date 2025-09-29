import React from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {KeyRound, User} from "lucide-react";
import {FormInput} from "@/components/auth/FormInput";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {AppleIcon, FacebookIcon, GoogleIcon} from "@/components/common/icons";
import Link from "next/link";

export interface RegisterFormProps {
    onCompleteAction: () => void;
}

const authFormSchema = z
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
    })
    .refine((data) => true, {
        message: "გთხოვთ, დარწმუნდეთ, რომ პაროლები ერთმანეთს ემთხვევა.",
        path: ["confirmPassword"],
    });

export function LoginForm({onCompleteAction}: RegisterFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            emailOrPhone: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof authFormSchema>) => {
        const {emailOrPhone, password, ...registerData} = values;
        // mutate(registerData);
        onCompleteAction()
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
                <div className="flex gap-3 w-full justify-center">
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
                <label className={"text-center text-gray-500"}>
                    არ გაქვს ანგარიში?&nbsp;-&nbsp;
                    <Link href={"/register"} className={"text-primary"}>
                        შექმენი
                    </Link>
                </label>
            </form>
        </Form>
    );

}