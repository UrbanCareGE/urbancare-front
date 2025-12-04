import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";
import DynamicPanel from "@/components/home/dynamic-panel/DynamicPanel";
import {RegisterLink} from "@/components/auth/login/common/RegisterLink";
import {TermsAndServicesLink} from "@/components/auth/login/common/TermsAndServicesLink";
import FloatingPanel from "@/components/home/floating-panel/FLoatingPanel";

export default function LoginPage() {

    return (
        <FloatingPanel>
            <FloatingPanel.Header></FloatingPanel.Header>
            <FloatingPanel.Body className={"flex flex-col justify-start"}>
                <DynamicPanel>
                    <DynamicPanel.Header>
                    </DynamicPanel.Header>
                    <DynamicPanel.Body className={"flex flex-col justify-center items-center gap-5"}>
                        <LoginHeader/>
                        <LoginForm/>
                        <RegisterLink/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Footer className={"h-auto p-3 gap-2"}>
                        <TermsAndServicesLink/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </FloatingPanel.Body>
        </FloatingPanel>

    );
}