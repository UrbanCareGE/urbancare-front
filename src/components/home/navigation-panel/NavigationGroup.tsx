import {NavItem} from "@/components/home/navigation-panel/NavigationArea";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Link from "next/link";

type NavigationGroupLinkProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
}

type NavigationGroupSubLinkProps = {
    navigationItem: NavItem;
}

export const NavigationGroupSubLink = ({navigationItem}: NavigationGroupSubLinkProps) => {
    const pathname = usePathname();

    const isActive = pathname === navigationItem.href ||
        (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

    return <Link
        href={navigationItem.href}
        className={"h-9 group relative w-full flex items-center gap-8 transition-all duration-200"}>
        <div className={cn("h-full w-1 bg-gray-200 rounded-full", isActive ? 'bg-primary' : 'bg-gray-200')}></div>
        <p className={cn(
            "text-gray-600 text-left truncate font-semibold text-lg",
        )}>
            {navigationItem.label}
        </p>
    </Link>
}

export const NavigationGroupLink = ({navigationItem}: NavigationGroupLinkProps) => {
    return (
        <div className={"flex flex-col w-full"}>
            <div
                className={"h-11 group relative w-full flex items-center gap-2 transition-all duration-200 px-4 py-2"}>
                {navigationItem.icon && (
                    <div className={cn(
                        "flex-shrink-0 transition-all duration-200",
                        "text-gray-600"
                    )}>
                        {navigationItem.icon}
                    </div>
                )}
                <p className={cn(
                    "flex-1 text-gray-600 text-left truncate font-semibold text-lg",
                )}>
                    {navigationItem.label}
                </p>
            </div>
            <div className={"flex"}>
                <div className={"flex flex-col w-full ml-7"}>
                    {navigationItem.children?.map(navigationItem => {
                        return <NavigationGroupSubLink key={navigationItem.href} navigationItem={navigationItem}/>
                    })}
                </div>

            </div>

        </div>

    );
};