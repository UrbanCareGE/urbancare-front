import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";
import {cookies} from "next/headers"
import {redirect} from "next/navigation";

export default async function LoginPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    console.log(token)
    if (token) {
        redirect("/");
    }

    return (
        <>
            <LoginHeader/>
            <LoginForm/>
        </>
    );
}