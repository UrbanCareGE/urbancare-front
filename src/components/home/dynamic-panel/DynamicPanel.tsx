import {cn} from "@/lib/utils";
import React, {ReactNode} from "react";
import {Separator} from "@/components/ui/separator";


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
        <div className={cn("w-full flex flex-col h-full", className)}>
            {children}
        </div>
    );
};

const DynamicPanelHeader = ({className, children}: DynamicPanelHeaderProps) => {
    return (
        <div className={cn(
            "w-full h-20 px-4 pb-2", className)}>
            {children}
        </div>
    );
};

const DynamicPanelBody = ({className, children,}: DynamicPanelBodyProps) => {
    return (
        <div className={cn(
            "w-full flex-1 overflow-scroll px-4", className)}>
            {children}
        </div>
    );
};

const DynamicPanelFooter = ({className, children,}: DynamicPanelFooterProps) => {
    return (
        <div className={cn(
            "w-full flex flex-col h-24 items-center justify-center px-4", className
        )}>
            {children}
        </div>
    );
};

const DynamicPanelSeparator = () => {
    return <Separator className={"bg-gray-200"}/>
}

export const DynamicPanel = Object.assign(DynamicPanelRoot, {
    Header: DynamicPanelHeader,
    Body: DynamicPanelBody,
    Footer: DynamicPanelFooter,
    Separator: DynamicPanelSeparator,
});

export default DynamicPanel;