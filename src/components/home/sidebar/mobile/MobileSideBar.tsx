'use client'

import React, {createContext, ReactNode, useContext} from "react";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";

interface MobileSideBarContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    side: 'left' | 'right';
}

const MobileSideBarContext = createContext<MobileSideBarContextType | undefined>(undefined);

const useMobileSideBar = () => {
    const context = useContext(MobileSideBarContext);
    if (!context) {
        throw new Error('useMobileSideBar must be used within MobileSideBar');
    }
    return context;
};

interface MobileSideBarRootProps {
    className?: string;
    children: ReactNode;
    side?: 'left' | 'right';
    defaultOpen?: boolean;
}

const MobileSideBarRoot = ({children, className, side = 'right', defaultOpen = false}: MobileSideBarRootProps) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <MobileSideBarContext.Provider value={{isOpen, setIsOpen, side}}>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                {children}
            </Sheet>
        </MobileSideBarContext.Provider>
    );
};

interface MobileSideBarTriggerProps {
    children: ReactNode;
    className?: string;
}

const MobileSideBarTriggerComponent = ({children, className}: MobileSideBarTriggerProps) => {
    return (
        <SheetTrigger className={cn('outline-none', className)}>
            {children}
        </SheetTrigger>
    );
};

interface MobileSideBarContentProps {
    children: ReactNode;
    className?: string;
}

const MobileSideBarContentComponent = ({children, className}: MobileSideBarContentProps) => {
    const {side} = useMobileSideBar();

    return (
        <SheetContent
            side={side}
            className={cn("w-10/12 bg-text-bg", {
                'rounded-r-md': side === 'left',
                'rounded-l-md': side === 'right'
            })}
        >
            <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>user profile navbar</SheetDescription>
            </VisuallyHidden>
            <div className={cn("w-full flex flex-col h-full bg-background", className)}>
                {children}
            </div>
        </SheetContent>
    );
};

interface MobileSideBarHeaderProps {
    children: ReactNode;
    className?: string;
}

const MobileSideBarHeaderComponent = ({children, className}: MobileSideBarHeaderProps) => {
    return (
        <div className={cn("h-auto w-full py-4 px-3 border-b bg-background border-gray-200", className)}>
            {children}
        </div>
    );
};

interface MobileSideBarBodyProps {
    children: ReactNode;
    className?: string;
}

const MobileSideBarBodyComponent = ({children, className}: MobileSideBarBodyProps) => {
    return (
        <div className={cn("flex-1 w-full overflow-y-scroll bg-background", className)}>
            {children}
        </div>
    );
};

interface MobileSideBarFooterProps {
    children: ReactNode;
    className?: string;
}

const MobileSideBarFooterComponent = ({children, className}: MobileSideBarFooterProps) => {
    return (
        <div className={cn("h-auto w-full px-3 py-1 border-t bg-background border-border rounded-b-md", className)}>
            {children}
        </div>
    );
};

export const MobileSideBar = Object.assign(MobileSideBarRoot, {
    Trigger: MobileSideBarTriggerComponent,
    Content: MobileSideBarContentComponent,
    Header: MobileSideBarHeaderComponent,
    Body: MobileSideBarBodyComponent,
    Footer: MobileSideBarFooterComponent,
});