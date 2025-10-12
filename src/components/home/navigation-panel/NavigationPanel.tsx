import React, {ReactNode} from "react";
import {cn} from "@/lib/utils";

interface NavigationPanelProps {
    className?: string;
    children: ReactNode;
}

interface NavigationPanelHeaderProps {
    className?: string;
    children: ReactNode;
}

interface NavigationPanelBodyProps {
    className?: string;
    children?: ReactNode;
}

interface NavigationPanelFooterProps {
    className?: string;
    children: ReactNode;
}

const NavigationPanelRoot = ({className, children}: NavigationPanelProps) => {
    return (
        <div className={cn("flex flex-col gap-4 h-full", className)}>
            {children}
        </div>
    );
};

const NavigationPanelHeader = ({className, children}: NavigationPanelHeaderProps) => {
    return (
        <div className={cn(
            "w-full bg-white rounded-panel flex flex-col justify-center items-center", className)}>
            {children}
        </div>
    );
};

const NavigationPanelBody = ({className, children,}: NavigationPanelBodyProps) => {
    return (
        <div className={cn(
            "w-full flex-1 overflow-auto bg-white rounded-panel", className)}>
            {children}
        </div>
    );
};

const NavigationPanelFooter = ({className, children}: NavigationPanelFooterProps) => {
    return (
        <div className={cn(
            "w-full flex h-20 items-center justify-between p-2 bg-white rounded-panel", className
        )}>
            {children}
        </div>
    );
};

export const NavigationPanel = Object.assign(NavigationPanelRoot, {
    Header: NavigationPanelHeader,
    Body: NavigationPanelBody,
    Footer: NavigationPanelFooter,
});
