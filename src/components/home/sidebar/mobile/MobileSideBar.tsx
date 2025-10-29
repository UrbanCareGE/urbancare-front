'use client'

import React, {ReactNode} from "react";
import {Sheet, SheetContent, SheetDescription, SheetTitle} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";

interface SidebarProps {
    children: ReactNode;
    className?: string;
    side: 'left' | 'right';
    trigger: ReactNode;
}

export const MobileSideBar = ({children, className, side, trigger}: SidebarProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                {trigger}
                <SheetContent side={side}
                              className={cn("w-10/12 bg-white", {
                                  'rounded-r-md': side === 'left',
                                  'rounded-l-md': side === 'right'
                              })}>
                    <VisuallyHidden>
                        <SheetTitle> Navigation Menu</SheetTitle>
                        <SheetDescription>user profile navbar</SheetDescription>
                    </VisuallyHidden>
                    <div className={cn("w-full h-full", className)}>
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
        ;
};
