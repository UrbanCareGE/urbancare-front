import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

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
        className={"h-9 group relative w-full flex items-center gap-8 px-1 transition-all duration-200"}>
        <div className={cn("h-full w-1 rounded-full", isActive ? 'bg-primary' : 'bg-primary-bg/80')}></div>
        <p className={cn(
            "text-text-primary text-left truncate font-semibold text-lg mr-auto",
        )}>
            {navigationItem.label}
        </p>
        <ChevronRight className={"w-5 h-5 text-primary"}/>
    </Link>
}

export const NavigationGroupLink = ({navigationItem}: NavigationGroupLinkProps) => {
    return (
        <div className={"flex flex-col w-full"}>
            <div
                className={"h-11 group relative w-full flex items-center gap-2 transition-all duration-200 px-1 py-2"}>
                {navigationItem.icon && (
                    <div className={cn(
                        "flex-shrink-0 transition-all duration-200 bg-primary-bg/50 rounded-full p-2 flex justify-center items-center",
                        "text-gray-500 group-hover:text-gray-400"
                    )}>
                        {navigationItem.icon}
                    </div>
                )}
                <p className={cn(
                    "flex-1 text-text-primary text-left truncate font-semibold text-lg",
                )}>
                    {navigationItem.label}
                </p>
            </div>
            <div className={"flex"}>
                <div className={"flex flex-col w-full ml-5"}>
                    {navigationItem.children?.map(navigationItem => {
                        return <NavigationGroupSubLink key={navigationItem.href} navigationItem={navigationItem}/>
                    })}
                </div>

            </div>

        </div>

    );
};