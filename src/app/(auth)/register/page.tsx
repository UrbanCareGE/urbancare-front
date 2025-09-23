'use client'

import React from "react";
import {RegisterForm} from "@/components/auth/RegisterForm";
import {Label} from "@/components/ui/label";


export default function RegisterContent() {
    return (
        <div className={"flex flex-col"}>
            <Label className={"text-3xl font-bold"}>ანგარიშის შექმნა</Label>
            <RegisterForm onCompleteAction={function (): void {
                throw new Error("Function not implemented.");
            }}/>
        </div>
    );
}