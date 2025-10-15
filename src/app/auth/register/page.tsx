import React from "react";
import {RegisterHeader} from "@/components/auth/register/RegisterHeader";
import {RegisterForm} from "@/components/auth/register/RegisterForm";

export default function RegisterPage() {
    return (
        <div className={"w-full flex flex-col justify-center items-center p-3 bg-white rounded-panel"}>
            <RegisterHeader/>
            <RegisterForm/>
        </div>
    );
}