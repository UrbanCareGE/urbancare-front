import {cn} from "@/lib/utils";
import React, {ReactNode} from "react";
import AnimatedContent from "@/components/AnimatedContent";


interface FloatingPanelRootProps {
    className?: string;
    children: ReactNode;
}

interface FloatingPanelHeaderProps {
    className?: string;
    children?: ReactNode;
}

interface FloatingPanelBodyProps {
    className?: string;
    children: ReactNode;
}

const FloatingPanelRoot = ({className, children}: FloatingPanelRootProps) => {
    return (
        <div className={cn("w-full flex flex-col h-full bg-primary", className)}>
            {children}
        </div>
    );
};

const FloatingPanelHeader = ({className, children}: FloatingPanelHeaderProps) => {
    return (
        <div className={cn(
            "w-full h-40 px-4 pb-2", className)}>
            {children}
        </div>
    );
};

const FloatingPanelBody = ({className, children,}: FloatingPanelBodyProps) => {
    return (
        <div className={cn(
            "w-full flex-1 animate-panel-slide-up overflow-scroll bg-background p-4 rounded-t-3xl", className)}>
            {children}
        </div>
    );
};

export const FloatingPanel = Object.assign(FloatingPanelRoot, {
    Header: FloatingPanelHeader,
    Body: FloatingPanelBody,
});

export default FloatingPanel;