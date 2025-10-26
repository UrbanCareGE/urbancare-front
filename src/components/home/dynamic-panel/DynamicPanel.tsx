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

interface DynamicPanelFooterProps {
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
            "w-full h-20 p-4 bg-white rounded-panel shadow-sm", className)}>
            {children}
        </div>
    );
};

const DynamicPanelBody = ({className, children,}: DynamicPanelBodyProps) => {
    return (
        <div className={cn(
            "w-full flex-1 overflow-auto bg-white rounded-panel shadow-sm", className)}>
            {children}
        </div>
    );
};

const DynamicPanelFooter = ({className, children,}: DynamicPanelFooterProps) => {
    return (
        <div className={cn(
            "w-full flex h-16 items-center justify-between p-1 bg-white rounded-panel shadow-sm", className
        )}>
            {children}
        </div>
    );
};

export const DynamicPanel = Object.assign(DynamicPanelRoot, {
    Header: DynamicPanelHeader,
    Body: DynamicPanelBody,
    Footer: DynamicPanelFooter,
});