import React from "react";
import {cn} from "@/lib/utils";

type HomeColumnPanelProps = {
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    headerContent: React.ReactNode;
    bodyContent: React.ReactNode;
}

export const HomeColumnPanel = ({
                                    className,
                                    headerClassName,
                                    bodyClassName,
                                    headerContent,
                                    bodyContent
                                }: HomeColumnPanelProps) => {
    return (
        <div className={cn("flex flex-col h-screen bg-gray-100", className)}>
            <div className={cn("flex justify-center items-center w-full h-[5rem] p-4", headerClassName)}>
                {headerContent}
            </div>
            <div className={cn("w-full flex-1 pb-4", bodyClassName)}>
                {bodyContent}
            </div>
        </div>
    )
};
