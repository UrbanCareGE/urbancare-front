'use client';

import React, {useContext, useState} from 'react';
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";
import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";

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
            <VisuallyHidden>
                <SheetTitle>
                    fear not for i am with you!
                </SheetTitle>
            </VisuallyHidden>
            <SheetContent side={'right'} className={cn("h-full w-full bg-slate-50", className)}>
                <div className={cn("h-full overflow-y-auto bg-slate-50", className)}>
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
    return <div className={cn("h-16 w-full bg-white border-b", className)}>
        {children}
    </div>
}

interface PreviewableBodyProps {
    className?: string;
    children: React.ReactNode;
}

const PreviewableBody = ({className, children}: PreviewableBodyProps) => {
    return <div className={cn("w-full", className)}>
        {children}
    </div>
}

export const Previewable = Object.assign(PreviewableRoot, {
    View: PreviewableView,
    Header: PreviewableHeader,
    Body: PreviewableBody,
});

export default Previewable;