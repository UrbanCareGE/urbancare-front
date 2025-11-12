// components/thread/ThreadCard.tsx
'use client';

import React, {useContext, useState} from 'react';
import {Card} from '@/components/ui/card';
import {cn} from "@/lib/utils";
import {ThreadInfoDTO} from "@/model/thread.dto";

interface ThreadContextValue {
    thread: ThreadInfoDTO;
    setThread: React.Dispatch<React.SetStateAction<ThreadInfoDTO>>;
}

const ThreadContext = React.createContext<ThreadContextValue | undefined>(undefined);

export function useThread() {
    const context = useContext(ThreadContext);
    if (context === undefined) {
        throw new Error('useThread must be used within a ThreadCard');
    }
    return context;
}

interface ThreadCardRootProps {
    className?: string;
    children: React.ReactNode;
    thread: ThreadInfoDTO;
}

const ThreadCardRoot = ({thread, children, className}: ThreadCardRootProps) => {
    const [threadState, setThreadState] = useState<ThreadInfoDTO>(thread);
    return (
        <ThreadContext.Provider value={{thread: threadState, setThread: setThreadState}}>
            <Card
                className={cn(
                    "overflow-hidden shadow-sm border-slate-200 bg-white p-5 space-y-3 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-slate-300",
                    className
                )}
            >
                {children}
            </Card>
        </ThreadContext.Provider>
    );
};

interface ThreadCardHeaderProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardHeader = ({className, children}: ThreadCardHeaderProps) => {
    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {children}
        </div>
    );
};

interface ThreadCardBodyProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardBody = ({className, children}: ThreadCardBodyProps) => {
    return (
        <div className={cn("px-1", className)}>
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
        <div className={cn("flex items-center justify-between border-t border-slate-100 gap-3 pt-3", className)}>
            {children}
        </div>
    );
};

export const ThreadCard = Object.assign(ThreadCardRoot, {
    Header: ThreadCardHeader,
    Body: ThreadCardBody,
    Footer: ThreadCardFooter,
});

export default ThreadCard;