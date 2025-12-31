"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {KeyRound, Loader2, Mail} from "lucide-react";
import {useAuth} from "@/components/provider/AuthProvider";
import Link from "next/link";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {FormInput} from "@/components/common/input/FormInput";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const LoginFormSchema = z.object({
    email: z.string().min(1, {message: "Please enter your email"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
});

export default function LoginPage() {
    const {logIn, isLoggingIn} = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

            {/* Main Container */}
            <div className="relative z-10 flex flex-col min-h-screen px-6 py-6 max-w-md mx-auto">
                {/* Header */}
                <header className={`text-center pt-10 pb-8 ${mounted ? 'animate-slide-down' : 'opacity-0'}`}>
                    <div className="inline-flex items-center gap-2.5 mb-2">
                        {/* Logo Icon */}
                        <div
                            className="relative w-12 h-12 rounded-[14px] bg-gradient-primary flex items-center justify-center shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] overflow-hidden">
                            <div
                                className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[14px]"/>
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 relative z-10"
                                fill="white"
                            >
                                <path
                                    d="M12 2L3 9V20C3 20.55 3.45 21 4 21H9V14H15V21H20C20.55 21 21 20.55 21 20V9L12 2Z"/>
                                <path d="M12 5L7 9V12H17V9L12 5Z" fillOpacity="0.3"/>
                            </svg>
                        </div>

                        {/* Logo Text */}
                        <span className="text-[26px] font-bold bg-gradient-primary-text">
              UrbanCare
            </span>
                    </div>
                    <p className="text-secondary text-[15px] font-medium">
                        Your neighborhood, connected
                    </p>
                </header>

                {/* Auth Card */}
                <Card
                    className={`border-border-light shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.06)] rounded-3xl ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
                    <CardContent className="p-8">
                        <h1 className="text-2xl font-bold text-center text-primary mb-2">
                            Welcome back
                        </h1>
                        <p className="text-center text-secondary text-sm mb-7">
                            Sign in to continue to your community
                        </p>

                        {/* OAuth Buttons */}
                        <div className="flex flex-col gap-3 mb-7">
                            {/* Google */}
                            <Button
                                variant="outline"
                                className="w-full h-[52px] rounded-[14px] border-[1.5px] border-border-medium bg-white hover:bg-white hover:border-border-hover shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 text-text-primary text-[15px] font-semibold gap-3"
                                onClick={() => handleOAuthLogin("google")}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"/>
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"/>
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"/>
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"/>
                                </svg>
                                Continue with Google
                            </Button>

                            {/* Apple */}
                            <Button
                                className="w-full h-[52px] rounded-[14px] bg-[#212121] hover:bg-black shadow-[0_4px_12px_rgba(33,33,33,0.2)] transition-all duration-200 text-white text-[15px] font-semibold gap-3"
                                onClick={() => handleOAuthLogin("apple")}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                    <path
                                        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </svg>
                                Continue with Apple
                            </Button>

                            {/* Facebook */}
                            <Button
                                className="w-full h-[52px] rounded-[14px] bg-[#1877F2] hover:bg-[#166FE5] shadow-[0_4px_12px_rgba(24,119,242,0.3)] transition-all duration-200 text-white text-[15px] font-semibold gap-3"
                                onClick={() => handleOAuthLogin("facebook")}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Continue with Facebook
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-border-light"/>
                            <span className="text-text-muted text-[13px] font-medium uppercase tracking-wide">
                or
              </span>
                            <div className="flex-1 h-px bg-border-light"/>
                        </div>

                        {/* Email Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FormInput
                                                    placeholder="Email address"
                                                    disabled={isLoggingIn}
                                                    icon={<Mail className="text-gray-600"/>}
                                                    className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-white text-[15px] text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FormInput
                                                    placeholder="Password"
                                                    icon={<KeyRound className="text-gray-600"/>}
                                                    type="password"
                                                    isPasswordType
                                                    disabled={isLoggingIn}
                                                    className="h-[52px] rounded-xl border-[1.5px] border-border-medium bg-white text-[15px] text-text-primary placeholder:text-text-muted hover:border-border-hover focus:border-primary focus:ring-4 focus:ring-primary-light transition-all duration-200"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Forgot Password */}
                                <div className="flex justify-end">
                                    <Link
                                        href="/auth/recover-password"
                                        className="text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full h-[52px] rounded-[14px] bg-gradient-primary shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] hover:shadow-[0_6px_24px_rgba(var(--color-primary)/0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-white text-base font-semibold relative overflow-hidden"
                                >
                                    <div
                                        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"/>
                                    {isLoggingIn ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2"/>
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className={`text-center py-6 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
                    <p className="text-text-secondary text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/register"
                            className="text-primary font-semibold hover:text-primary-dark transition-colors"
                        >
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Terms */}
                <div className={`text-center pb-8 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
                    <p className="text-text-muted text-xs leading-relaxed">
                        By continuing, you agree to our{" "}
                        <Link href="/terms"
                              className="text-text-secondary underline underline-offset-2 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy"
                              className="text-text-secondary underline underline-offset-2 hover:text-primary">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}