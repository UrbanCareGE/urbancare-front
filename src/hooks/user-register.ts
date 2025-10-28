'use client'

import {useMutation} from "@tanstack/react-query";
import {ErrorResponse} from "@/model/common.dto";
import {AuthService} from "@/service/auth-service";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {registerSchema} from "@/components/auth/register/data/register-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {RegisterDTO} from "@/model/auth.dto";


export function useRegister() {
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
            otp: ""
        },
    });

    const {mutate, isPending, isError} = useMutation<
        string,
        ErrorResponse,
        RegisterDTO
    >({
        mutationFn: AuthService.register,
        onSuccess: () => {
            router.push("/");
        },
        onError: (err) => {
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        const registerReq: RegisterDTO = {
            name: values.firstName,
            surname: values.lastName,
            password: values.password,
            phone: values.emailOrPhone,
            otp: values.otp,
        }
        mutate(registerReq);
    };


    return {form, onSubmit, mutate, isPending, isError};
}