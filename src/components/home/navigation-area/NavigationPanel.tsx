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
    children: ReactNode;
}

interface NavigationPanelFooterProps {
    className?: string;
    children: ReactNode;
}

const NavigationPanelRoot = ({className, children}: NavigationPanelProps) => {
    return (
        <div className={cn("flex flex-col h-full bg-white rounded-panel", className)}>
            {children}
        </div>
    );
};

const NavigationPanelHeader = ({className, children}: NavigationPanelHeaderProps) => {
    return (
        <div className={cn("flex justify-center items-center w-full h-[5rem] flex-shrink-0", className)}>
            {children}
        </div>
    );
};

const NavigationPanelBody = ({className, children}: NavigationPanelBodyProps) => {
    return (
        <div className={cn("w-full flex-1 overflow-auto", className)}>
            {children}
        </div>
    );
};

const NavigationPanelFooter = ({className, children}: NavigationPanelFooterProps) => {
    return (
        <div className={cn("w-full flex-shrink-0 p-4", className)}>
            {children}
        </div>
    );
};

export const NavigationPanel = Object.assign(NavigationPanelRoot, {
    Header: NavigationPanelHeader,
    Body: NavigationPanelBody,
    Footer: NavigationPanelFooter,
});
