import React from "react";
import {LoginForm} from "@/components/auth/login/LoginForm";
import {LoginHeader} from "@/components/auth/login/LoginHeader";
import DynamicPanel from "@/components/home/dynamic-panel/DynamicPanel";
import {RegisterLink} from "@/components/auth/login/RegisterLink";
import FloatingPanel from "@/components/home/floating-panel/FLoatingPanel";
import Image from "next/image";

export default function LoginPage() {

    return (
        <FloatingPanel>
            <FloatingPanel.Header className={"p-0"}>
                <Image src={"/assets/tbilisi_wallpaper.png"} alt={"d"} width={1536} height={1024}
                       className={"w-full h-60 object-fill"}/>
            </FloatingPanel.Header>
            <FloatingPanel.Body className={"flex flex-col justify-start"}>
                <DynamicPanel>
                    <DynamicPanel.Header>
                    </DynamicPanel.Header>
                    <DynamicPanel.Body className={"flex flex-col justify-center items-center gap-5 mb-auto"}>
                        <LoginHeader/>
                        <LoginForm/>
                    </DynamicPanel.Body>
                    <DynamicPanel.Footer className={"h-12 gap-2 justify-end"}>
                        <RegisterLink/>
                    </DynamicPanel.Footer>
                </DynamicPanel>
            </FloatingPanel.Body>
        </FloatingPanel>

    );
}