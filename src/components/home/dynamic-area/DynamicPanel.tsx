import {cn} from "@/lib/utils";
import React, {ReactNode} from "react";


interface DynamicPanelRootProps {
    className?: string;
    children: ReactNode;
}

interface DynamicPanelHeaderProps {
    className?: string;
    children?: ReactNode;
}

interface DynamicPanelBodyProps {
    className?: string;
    children: ReactNode;
}

const DynamicPanelRoot = ({className, children}: DynamicPanelRootProps) => {
    return (
        <div className={cn("flex flex-col gap-4 h-full min-h-0", className)}>
            {children}
        </div>
    );
};

const DynamicPanelHeader = ({className, children}: DynamicPanelHeaderProps) => {
    return (
        <div className={cn(
            "w-full flex-[2.4] p-4 bg-white rounded-panel", className)}>
            {children}
        </div>
    );
};

const DynamicPanelBody = ({className, children,}: DynamicPanelBodyProps) => {
    return (
        <div className={cn(
            "w-full flex-[3] bg-white rounded-panel", className)}>
            {children}
        </div>
    );
};

export const DynamicPanel = Object.assign(DynamicPanelRoot, {
    Header: DynamicPanelHeader,
    Body: DynamicPanelBody,
});