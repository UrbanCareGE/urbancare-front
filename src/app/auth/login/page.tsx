"use client";

import React from "react";
import {useAuth} from "@/components/provider/AuthProvider";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {LoginFormCard} from "@/components/auth/login/LoginFormCard";
import {LoginHeader} from "@/components/auth/login/LoginHeader";
import {LoginFooter} from "@/components/auth/login/LoginFooter";
import DynamicPanel from "@/components/home/dynamic-panel/DynamicPanel";

const LoginFormSchema = z.object({
    email: z.string().min(1, {message: "გთხოვთ შეიყვანოთ მობილური ტელეფონი"}),
    password: z.string().min(6, {message: "პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსაგან"}),
});

export default function LoginPage() {
    const {logIn, isLoggingIn} = useAuth();


    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
        const {email, password} = values;
        const loginData = {
            phone: email, // You may need to adjust this based on your backend
            password: password,
        };
        logIn(loginData);
    };

    const handleOAuthLogin = (provider: string) => {
        // Handle OAuth login
        console.log(`Login with ${provider}`);
    };

    return (
        <div className="relative min-h-screen bg-background overflow-scroll">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              linear-gradient(rgb(var(--color-border-light)) 1px, transparent 1px),
              linear-gradient(90deg, rgb(var(--color-border-light)) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Animated Blobs */}
                <div
                    className="absolute -top-24 -right-24 w-72 h-72 bg-primary-light rounded-full blur-[80px] opacity-40 animate-blob"/>
                <div
                    className="absolute bottom-[20%] -left-20 w-64 h-64 bg-gradient-secondary-purple rounded-full blur-[80px] opacity-40 animate-blob animation-delay-2000"/>
                <div
                    className="absolute -bottom-12 right-[10%] w-52 h-52 bg-primary-hover rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000"/>
            </div>

            <DynamicPanel className={"relative z-10 min-h-screen px-6 py-6 max-w-md mx-auto"}>
                <DynamicPanel.Header>
                    <LoginHeader/>
                </DynamicPanel.Header>
                <DynamicPanel.Body>
                    <LoginFormCard/>
                </DynamicPanel.Body>
                <DynamicPanel.Footer>
                    <LoginFooter/>
                </DynamicPanel.Footer>
            </DynamicPanel>
            {/* Main Container */}
            <div className="">
                {/* Header */}

                {/* Auth Card */}
                {/* Footer */}
            </div>
        </div>
    );
}