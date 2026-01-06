'use client'

import React from "react";
import {cn} from "@/lib/utils";
import {AiFillHome} from "react-icons/ai";

type UrbanCareIconProps = {
    className?: string,
    iconClassName?: string,
}

export const UrbanCareIcon = ({className, iconClassName}: UrbanCareIconProps) => {
    return <div
        className={cn("relative w-14 h-14 rounded-panel bg-gradient-primary flex items-center justify-center shadow-[0_4px_16px_rgba(var(--color-primary)/0.3)] overflow-hidden", className)}>
        <AiFillHome fill={'white'} className={cn('w-8 h-8', iconClassName)}/>
    </div>;
}

type UrbanCareTextIconProps = {
    className?: string;
}

export const UrbanCareTextIcon = ({className}: UrbanCareTextIconProps) => {
    return <span className={cn("text-2xl font-bold bg-gradient-primary-text", className)}>UrbanCare</span>
}

export const AppLogo = () => {
    return (
        <div className="h-12 flex justify-start items-center mr-aut gap-3">
            <UrbanCareIcon className={"w-10 h-10"}/>
            <UrbanCareTextIcon/>
        </div>
    );
};