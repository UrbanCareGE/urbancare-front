import React from "react";
import {RegisterHeader} from "@/components/auth/register/RegisterHeader";
import {RegisterForm} from "@/components/auth/register/RegisterForm";
import DynamicPanel from "@/components/home/dynamic-panel/DynamicPanel";
import {LoginLink} from "@/components/auth/register/LoginLink";

export default function RegisterPage() {
    return (
        <DynamicPanel>
            <DynamicPanel.Body className={"flex flex-col justify-center items-center"}>
                <RegisterHeader/>
                <RegisterForm/>
            </DynamicPanel.Body>
            <DynamicPanel.Footer className={"h-auto p-3 gap-2"}>
                <LoginLink/>
            </DynamicPanel.Footer>
        </DynamicPanel>
    );
}