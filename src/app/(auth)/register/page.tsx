'use client'

import React from "react";
import {RegisterForm} from "@/components/auth/RegisterForm";

export default function RegisterContent() {
    return (
        <div className={"flex flex-col w-full px-12"}>
            <RegisterForm onCompleteAction={function (): void {
                throw new Error("Function not implemented.");
            }}/>
        </div>
    );
}