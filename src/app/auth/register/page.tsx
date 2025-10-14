import React from "react";
import {RegisterHeader} from "@/components/auth/register/RegisterHeader";
import {RegisterForm} from "@/components/auth/register/RegisterForm";

export default function RegisterPage() {
    return (
        <div className={"flex flex-col justify-center items-center p-2"}>
            <RegisterHeader/>
            <RegisterForm/>
        </div>
    );
}