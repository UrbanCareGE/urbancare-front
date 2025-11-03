'use client';

import React, {useContext} from 'react';
import {Card} from '@/components/ui/card';
import {cn} from "@/lib/utils";
import {ThreadInfoDTO} from "@/model/thread.dto";

interface ThreadCardRootProps {
    className?: string;
    children: React.ReactNode;
    thread: ThreadInfoDTO;
}

const ThreadContext = React.createContext<ThreadInfoDTO | undefined>(undefined);


export function useThread() {
    const context = useContext(ThreadContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

const ThreadCardRoot = ({thread, children, className}: ThreadCardRootProps) => {
    return (
        <ThreadContext.Provider value={thread}>
            <Card
                className={cn("overflow-hidden shadow-lg border-slate-200 bg-white transition-all duration-300 p-3", className)}>
                {children}
            </Card>
        </ThreadContext.Provider>
    );
}

interface ThreadCardHeaderProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardHeader = ({className, children}: ThreadCardHeaderProps) => {
    return (
        <div className={cn("flex items-center justify-between w-full px-2 py-3", className)}>
            {children}
        </div>
    )
}

interface ThreadCardBodyProps {
    className?: string;
    children: React.ReactNode;
}

const ThreadCardBody = ({className, children}: ThreadCardBodyProps) => {
    return (
        <div className={cn("flex items-center justify-between px-2 py-3 border-t border-slate-100", className)}>
            {children}
        </div>
    )
}

interface ThreadCardFooterProps {
    className?: string;
    children: React.ReactNode;
}


const ThreadCardFooter = ({className, children}: ThreadCardFooterProps) => {
    return (
        <div className={cn("flex items-center justify-between px-2 py-3 border-slate-100 gap-3", className)}>
            {children}
        </div>
    )
}

export const ThreadCard = Object.assign(ThreadCardRoot, {
    Header: ThreadCardHeader,
    Body: ThreadCardBody,
    Footer: ThreadCardFooter,
})

export default ThreadCard;