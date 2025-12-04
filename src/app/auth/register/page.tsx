import React from "react";
import {RegisterHeader} from "@/components/auth/register/RegisterHeader";
import {RegisterForm} from "@/components/auth/register/RegisterForm";
import DynamicPanel from "@/components/home/dynamic-panel/DynamicPanel";
import FLoatingPanel from "@/components/home/floating-panel/FLoatingPanel";
import {LoginLink} from "@/components/auth/register/common/LoginLink";

export default function RegisterPage() {
    return (
        <FLoatingPanel>
            <FLoatingPanel.Header className={"h-40"}></FLoatingPanel.Header>
            <FLoatingPanel.Body>
                <DynamicPanel>
                    <DynamicPanel.Body className={"flex flex-col justify-center items-center"}>
                        <RegisterHeader/>
                        <RegisterForm/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Footer className={"h-auto p-3 gap-2"}>
                        <LoginLink/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </FLoatingPanel.Body>
        </FLoatingPanel>
    );
}