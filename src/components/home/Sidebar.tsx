"use client";

import React, {ReactNode} from "react";
import {Sheet, SheetContent, SheetTitle} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";

interface SidebarProps {
    children: ReactNode;
    className?: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const Sidebar = ({children, className, isOpen, onOpenChange}: SidebarProps) => {
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onOpenChange}>
                <SheetContent side="left" className="w-72 p-0 lg:hidden">
                    <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                    </VisuallyHidden>
                    <div className={cn("h-full", className)}>
                        {children}
                    </div>
                </SheetContent>
            </Sheet>

            <aside className={cn("hidden lg:block w-72", className)}>
                {children}
            </aside>
        </>
    );
};
