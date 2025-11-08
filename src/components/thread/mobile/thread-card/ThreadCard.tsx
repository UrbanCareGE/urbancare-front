// components/thread/ThreadCard.tsx
'use client';

import React, {useContext, useState} from 'react';
import {Card} from '@/components/ui/card';
import {cn} from "@/lib/utils";
import {ThreadInfoDTO} from "@/model/thread.dto";
import {VisuallyHidden} from "@/components/ui/visually-hidden";
import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";

interface ThreadContextValue {
    thread: ThreadInfoDTO;
}

interface ThreadDrawerContextValue {
    isOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const ThreadContext = React.createContext<ThreadContextValue | undefined>(undefined);
const ThreadDrawerContext = React.createContext<ThreadDrawerContextValue | undefined>(undefined);

export function useThread() {
    const context = useContext(ThreadContext);
    if (context === undefined) {
        throw new Error('useThread must be used within a ThreadCard');
    }
    return context;
}

export function useThreadDrawer() {
    const context = useContext(ThreadDrawerContext);
    if (context === undefined) {
        throw new Error('useThreadDrawer must be used within a ThreadCard');
    }
    return context;
}

interface ThreadCardRootProps {
    className?: string;
    children: React.ReactNode;
    thread: ThreadInfoDTO;
}

const ThreadCardRoot = ({thread, children, className}: ThreadCardRootProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const threadValue: ThreadContextValue = {
        thread
    };

    const drawerValue: ThreadDrawerContextValue = {
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
    };

    return (
        <ThreadContext.Provider value={threadValue}>
            <ThreadDrawerContext.Provider value={drawerValue}>
                <Card
                    className={cn(
                        "overflow-hidden shadow-sm border-slate-200 bg-white transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300",
                        className
                    )}
                >
                    {children}
                </Card>
            </ThreadDrawerContext.Provider>
        </ThreadContext.Provider>
    );
};

interface ThreadCardSheetProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardSheet = ({className, children}: ThreadCardSheetProps) => {
    const {isOpen, closeDrawer} = useThreadDrawer();

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
            <VisuallyHidden>
                <SheetTitle>
                    fear not for i am with you!
                </SheetTitle>
            </VisuallyHidden>
            <SheetContent side={'right'} className={cn("h-full w-full bg-slate-50", className)}>
                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
};

interface ThreadCardHeaderProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardHeader = ({className, children}: ThreadCardHeaderProps) => {
    return (
        <div className={cn("flex items-center justify-between w-full p-4", className)}>
            {children}
        </div>
    );
};

interface ThreadCardBodyProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardBody = ({className, children}: ThreadCardBodyProps) => {
    const {openDrawer} = useThreadDrawer();
    return (
        <div className={cn("px-4 py-3", className)} onClick={openDrawer}>
            {children}
        </div>
    );
};

interface ThreadCardFooterProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardFooter = ({className, children}: ThreadCardFooterProps) => {
    return (
        <div className={cn("flex items-center justify-between p-4 border-t border-slate-100 gap-3", className)}>
            {children}
        </div>
    );
};

export const ThreadCard = Object.assign(ThreadCardRoot, {
    Sheet: ThreadCardSheet,
    Header: ThreadCardHeader,
    Body: ThreadCardBody,
    Footer: ThreadCardFooter,
});

export default ThreadCard;