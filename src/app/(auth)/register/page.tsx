'use client'

import React from "react";
import {RegisterHeader} from "@/components/auth/register/RegisterHeader";
import {RegisterForm} from "@/components/auth/register/RegisterForm";

export default function RegisterContent() {
    return (
        <div className={"flex w-full h-full flex-col px-8"}>
            <RegisterHeader />
            <RegisterForm onCompleteAction={function (): void {

            }}/>
        </div>
    );
}