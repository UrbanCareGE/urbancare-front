'use client'

import {Button} from "@/components/ui/button";
import React from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

type ProfileNavigationButtonProps = {
    className?: string;
    logo: React.ReactNode;
    href: string;
}

export const ProfileBarButton = ({className, logo, href}: ProfileNavigationButtonProps) => {
    const router = useRouter();
    return (
        <Button variant={"ghost"}
                className={cn("[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 rounded-full border aspect-square p-0 hover:bg-primary hover:text-white hover:scale-105", className)}
                onClick={() => {
                    router.push(href);
                }}
        >
            {logo}
        </Button>
    );
};
