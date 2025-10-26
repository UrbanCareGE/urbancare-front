'use client'

import React, {ReactNode} from "react";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
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
                <SheetTrigger className={"outline-none"}>
                    <Menu className={"h-8 w-8 stroke-gray-800"}/>
                </SheetTrigger>
                <SheetContent side="left" className="w-10/12 bg-white rounded-r-panel">
                    <VisuallyHidden>
                        <SheetTitle>temp</SheetTitle>
                        <SheetDescription>temp</SheetDescription>
                    </VisuallyHidden>
                    <div className={cn("w-full h-full", className)}>
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};
