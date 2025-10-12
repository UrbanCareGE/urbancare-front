'use client'

import React from "react";
import {Input} from "@/components/ui/input";
import {DynamicPanel} from "@/components/home/dynamic-panel/DynamicPanel";

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
