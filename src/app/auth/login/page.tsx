import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";

export default function LoginPage() {
    return (
        <div className={"w-full flex flex-col justify-center items-center p-2 gap-4"}>
            <LoginHeader/>
            <LoginForm/>
        </div>
    );
}