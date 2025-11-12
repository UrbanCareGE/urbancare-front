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
                <div className={cn("h-full overflow-y-auto p-3 bg-slate-50", className)}>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
};


export const Previewable = Object.assign(PreviewableRoot, {
    View: PreviewableView,
});

export default Previewable;