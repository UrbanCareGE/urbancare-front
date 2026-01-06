'use client'

import React from "react";
import {AppLogo, UrbanCareIcon, UrbanCareTextIcon} from "@/components/common/logo/AppLogo";

type LoginHeaderProps = {
    className?: string
}

export const LoginHeader: React.FC<LoginHeaderProps> = () => {
    return (
        <header className={'text-center py-6 animate-slide-down'}>
            <div className="inline-flex flex-col items-center gap-2">
                <UrbanCareIcon/>
                <UrbanCareTextIcon/>
            </div>
        </header>
    );

}