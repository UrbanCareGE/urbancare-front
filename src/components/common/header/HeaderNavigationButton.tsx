'use client'

import {Button} from "@/components/ui/button";
import React from "react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

type NavigationButtonProps = {
    title: string;
    icon: React.ReactNode;
    navigationPath: string;
    className?: string;
} & React.ComponentProps<"button">

export const HeaderNavigationButton: React.FC<NavigationButtonProps> = ({
                                                                            title,
                                                                            icon,
                                                                            navigationPath,
                                                                            className,
                                                                            ...rest
                                                                        }) => {
    const router = useRouter();
    return (
        <Button
            title={title}
            variant={"link"}
            className={cn("select-none text-xl font-bold h-full rounded-none border-b-4", className)}
            onClick={() => {
                router.push(navigationPath);
            }}
            {...rest}
        >
            {icon}
        </Button>
    )
}