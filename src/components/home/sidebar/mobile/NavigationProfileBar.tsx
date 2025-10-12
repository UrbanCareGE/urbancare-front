'use client'

import React, {ReactNode} from "react";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";
import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";

interface SidebarProps {
    children: ReactNode;
    className?: string;
}

export const ProfileSideBar = ({children, className}: SidebarProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <SheetTrigger>
                    <ActiveUserAvatar/>
                </SheetTrigger>
                <SheetContent side="right" className="w-10/12 bg-white rounded-l-panel">
                    <VisuallyHidden>
                        <SheetTitle>Navigation Menu</SheetTitle>
                    </VisuallyHidden>
                    <div className={cn("h-full", className)}>
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};
