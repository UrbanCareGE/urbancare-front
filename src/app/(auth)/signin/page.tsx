'use client'

import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";

export default function SigninContent() {
    return (
        <div className={"flex flex-col w-full px-8"}>
            <LoginHeader/>
            <LoginForm onCompleteAction={function (): void {
                throw new Error("Function not implemented.");
            }}/>
        </div>
    );
}