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
    active?: boolean;
} & React.ComponentProps<"button">

export const HeaderNavigationButton: React.FC<NavigationButtonProps> = ({
                                                                            title,
                                                                            icon,
                                                                            navigationPath,
                                                                            className,
                                                                            active,
                                                                            ...rest
                                                                        }) => {
    const router = useRouter();
    return (
        <Button
            title={title}
            variant={"ghost"}
            className={cn("select-none text-xl font-bold h-10 p-3 rounded-panel transition-colors duration-300 ease-in-out bg-primary [&>svg]:stroke-white", className)}
            onClick={() => {
                router.push(navigationPath);
            }}
            {...rest}
        >
            {icon}
        </Button>
    )
}