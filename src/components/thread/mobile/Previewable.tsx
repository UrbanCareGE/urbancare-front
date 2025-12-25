'use client';

import React, {useContext, useState} from 'react';
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle} from "@/components/ui/sheet";
import {XIcon} from "lucide-react";

interface PreviewableCardContextValue {
    isOpen: boolean;
    openView: () => void;
    closeView: () => void;
}

const PreviewableCardContext = React.createContext<PreviewableCardContextValue | undefined>(undefined);

export function usePreviewable() {
    const context = useContext(PreviewableCardContext);
    if (context === undefined) {
        throw new Error('useThread must be used within a ThreadCard');
    }
    return context;
}

interface PreviewableRootProps {
    children: React.ReactNode;
}

const PreviewableRoot = ({children}: PreviewableRootProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const sheetValue: PreviewableCardContextValue = {
        isOpen,
        openView: () => setIsOpen(true),
        closeView: () => setIsOpen(false),
    };

    return (
        <PreviewableCardContext.Provider value={{...sheetValue}}>
            {children}
        </PreviewableCardContext.Provider>
    );
};

interface PreviewableViewProps {
    className?: string;
    children: React.ReactNode;
}

const PreviewableView = ({className, children}: PreviewableViewProps) => {
    const {isOpen, closeView} = usePreviewable();

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeView()}>
            <SheetDescription className={"sr-only"}>კომენტარი</SheetDescription>
            <SheetTitle className={"sr-only"}>კომენტარი</SheetTitle>
            <SheetContent side={'right'} className={cn("h-full w-full bg-slate-50", className)}>
                <div className={cn("relative h-full overflow-y-auto bg-slate-50", className)}>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
};

interface PreviewableHeaderProps {
    className?: string;
    children: React.ReactNode;
}

const PreviewableHeader = ({className, children}: PreviewableHeaderProps) => {
    return <div className={cn("flex items-center h-16 w-full px-3 bg-white border-b", className)}>
        {children}
        <SheetClose className="shrink-0 ml-auto">
            <XIcon className="w-8 h-8"/>
        </SheetClose>
    </div>
}

interface PreviewableBodyProps {
    className?: string;
    children: React.ReactNode;
}

const PreviewableBody = ({className, children}: PreviewableBodyProps) => {
    return <div className={cn("w-full", className)}>
        {children}
        <div className={"h-20"}></div>
    </div>
}

interface PreviewableFooterProps {
    className?: string;
    children: React.ReactNode;
}

const PreviewableFooter = ({className, children}: PreviewableFooterProps) => {
    return <div className={cn("fixed bottom-0 h-20 flex w-full bg-white items-center shadow-2xl", className)}>
        {children}
    </div>
}

export const Previewable = Object.assign(PreviewableRoot, {
    View: PreviewableView,
    Header: PreviewableHeader,
    Body: PreviewableBody,
    Footer: PreviewableFooter,
});

export default Previewable;