'use client'

import React, {ReactNode} from "react";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@/components/ui/visually-hidden";
import {Menu} from "lucide-react";

interface SidebarProps {
    children: ReactNode;
    className?: string;
}

export const NavigationSideBar = ({children, className}: SidebarProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <SheetTrigger>
                    <Menu className={"h-8 w-8"}></Menu>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-white rounded-panel">
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
