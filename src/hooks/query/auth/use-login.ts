'use client'

import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import LoginFormSchema from "@/components/auth/login/data/login-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {ErrorResponse} from "@/model/common.dto";
import {AuthService} from "@/service/auth-service";
import {z} from "zod";
import {LoginDTO} from "@/model/auth.dto";
import {useAuth} from "@/components/provider/AuthProvider";

export function useLogin() {
    const router = useRouter();
    const {refetchUser} = useAuth();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const {mutate, isPending, error} = useMutation<
        string,
        ErrorResponse,
        LoginDTO
    >({
        mutationFn: AuthService.login,
        onSuccess: () => {
            router.push("/")
            refetchUser().then();
        },
        onError: (err) => {
            console.log(err)
        },
    });

    const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
        const {phone, password} = values;
        const loginReq: LoginDTO = {
            phone: phone,
            password: password,
        }
        mutate(loginReq);
    };

    return {onSubmit, form, mutate, isPending, error};
}