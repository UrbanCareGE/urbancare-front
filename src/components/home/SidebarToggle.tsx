"use client";

import {Menu} from "lucide-react";
import {Button} from "@/components/ui/button";

interface SidebarToggleProps {
    onClick: () => void;
}

export const SidebarToggle = ({onClick}: SidebarToggleProps) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClick}
            aria-label="Toggle sidebar"
        >
            <Menu className="h-6 w-6"/>
        </Button>
    );
};
