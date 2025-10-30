import React from "react";
import {cn} from "@/lib/utils";


interface ProfileSideBarGroupHeaderProps {
    title: string;
    className?: string;
    children?: React.ReactNode;
}

interface ProfileSideBarGroupContentProps {
    className?: string;
    children?: React.ReactNode;
}


interface ProfileSideBarGroupProps {
    className?: string;
    children?: React.ReactNode;
}

export const ProfileSideBarGroupHeader = ({title, className, children}: ProfileSideBarGroupHeaderProps) => {
    return <h3 className={cn("text-lg text-gray-600 tracking-wide mb-2", className)}>
        {title}
    </h3>
}

export const ProfileSideBarGroupContent = ({className, children}: ProfileSideBarGroupContentProps) => {
    return <div className={cn("w-full h-full flex flex-col px-3 gap-1", className)}>
        {children}
    </div>
}

export const ProfileSideBarGroupRoot = ({className, children}: ProfileSideBarGroupProps) => {
    return (
        <div className={cn("w-full flex flex-col py-3", className)}>
            {children}
        </div>
    );
};

export const ProfileSideBarGroup = Object.assign(ProfileSideBarGroupRoot, {
    Header: ProfileSideBarGroupHeader,
    Content: ProfileSideBarGroupContent,
});