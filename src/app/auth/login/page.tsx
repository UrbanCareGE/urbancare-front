import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";

export default async function LoginPage() {
    return (
        <div className={"flex flex-col justify-center items-center p-2"}>
            <LoginHeader/>
            <LoginForm/>
        </div>
    );
}