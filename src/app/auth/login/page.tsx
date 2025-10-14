import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";

export default async function LoginPage() {
    return (
        <>
            <LoginHeader/>
            <LoginForm/>
        </>
    );
}