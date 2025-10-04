import React from "react";
import {RegisterHeader} from "@/components/auth/register/RegisterHeader";
import {RegisterForm} from "@/components/auth/register/RegisterForm";

export default function RegisterPage() {
    return (
        <div className={"flex w-full h-full flex-col px-8"}>
            <RegisterHeader/>
            <RegisterForm/>
        </div>
    );
}