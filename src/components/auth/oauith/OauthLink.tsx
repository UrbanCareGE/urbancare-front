import Link from "next/link";
import {cn} from "@/lib/utils";
import React, {ReactNode} from "react";

interface OauthLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
}

export const OauthLink = ({children, className, href}: OauthLinkProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center justify-center",
                "p-4",
                "bg-surface border border-border",
                "rounded-full shadow-2xl",
                "hover:bg-surface-hover hover:border-border-hover",
                "transition-colors duration-200",
                "font-medium",
                className
            )}
        >
            {children}
        </Link>
    );
};