import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

type NavigationSubLinkProps = {
    navigationItem: NavItem;
}

export const NavigationSubLink = ({navigationItem}: NavigationSubLinkProps) => {
    const pathname = usePathname();

    const isActive = pathname === navigationItem.href ||
        (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

    return <Link
        href={navigationItem.href}
        className={"h-9 group relative w-full flex items-center gap-8 px-1 transition-all duration-200 border-l border-border"}>
        <div className={cn("h-full w-1 rounded-full", isActive ? 'bg-primary' : 'bg-primary-bg/80')}></div>
        <p className="flex-1 text-text-primary/80 text-left truncate leading-tight font-medium text-base">
            {navigationItem.label}
        </p>
    </Link>
}