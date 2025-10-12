import Link from "next/link";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";

type NavigationButtonProps = {
    href: string,
    children?: ReactNode;
    className?: string,
}

export const NavigationButton = ({children, href, className}: NavigationButtonProps) => {
    return (
        <Link href={href} className={cn("w-full h-11 rounded-panel flex items-center hover:bg-gray-200 transition-colors px-3 py-1", className)}>{children}</Link>
    );
};
