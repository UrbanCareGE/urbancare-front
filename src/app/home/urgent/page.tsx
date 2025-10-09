'use client'

import Chat from "@/components/chat/Chat";
import {HomeColumnPanel} from "@/components/home/HomeColumnPanel";
import {DynamicPanel} from "@/components/home/dynamic-area/DynamicPanel";
import UrgentPreview from "@/components/urgent/UrgentPreview";
import React from "react";
import {Input} from "@/components/ui/input";

export default function Page() {
    return (
        <DynamicPanel>
            <DynamicPanel.Body>
                <div className={""}>შექმენი სასწრაფო განცხადება</div>
                <div className={""}>შეიყვანეთ ტექსტი</div>
                <Input/>
            </DynamicPanel.Body>
        </DynamicPanel>
    )
}
