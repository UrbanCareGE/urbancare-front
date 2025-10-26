import {NavItem} from "@/components/home/navigation-panel/NavigationArea";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";

type NavigationGroupLinkProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
}

type NavigationGroupSubLinkProps = {
    navigationItem: NavItem;
}

export const NavigationGroupSubLink = ({navigationItem}: NavigationGroupSubLinkProps) => {
    return <div
        className={"ml-4 h-9 group relative w-full flex items-center justify-between transition-all duration-200 rounded-panel px-4 py-2"}>
        <p className={cn(
            "text-left truncate",
        )}>
            {navigationItem.label}
        </p>
    </div>
}


export const NavigationGroupLink = ({navigationItem}: NavigationGroupLinkProps) => {
    return (
        <div className={"flex flex-col w-full"}>
            <div
                className={"h-11 group relative w-full flex items-center gap-3 transition-all duration-200 rounded-panel px-4 py-2"}>
                {navigationItem.icon && (
                    <div className={cn(
                        "flex-shrink-0 transition-all duration-200 rotate-180",
                        "text-gray-500 group-hover:text-gray-700 group-hover:scale-105"
                    )}>
                        {navigationItem.icon}
                    </div>
                )}
                <p className={cn(
                    "text-left truncate",
                )}>
                    {navigationItem.label}
                </p>
            </div>
            <div className={"flex"}>
                <div className={"h-full w-[2px] ml-6 bg-gray-200"}></div>
                <div className={"flex flex-col w-full"}>
                    {navigationItem.children?.map(navigationItem => {
                        return <NavigationGroupSubLink key={navigationItem.href} navigationItem={navigationItem}/>
                    })}
                </div>

            </div>

        </div>

    );
};
