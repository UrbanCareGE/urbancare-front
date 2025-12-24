import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {SheetClose} from "@/components/ui/sheet";

type NavigationSubLinkProps = {
    navigationItem: NavItem;
}

export const NavigationSubLink = ({navigationItem}: NavigationSubLinkProps) => {
    const pathname = usePathname();

    const isActive = pathname === navigationItem.href ||
        (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

    return (
        <SheetClose asChild>
            <Link
                href={navigationItem.href}
                className={"h-7 group relative flex items-center gap-9 px-1 border-l"}>
                <div className={cn("h-full w-1 rounded-full", isActive ? 'bg-primary' : 'bg-primary-bg/80')}></div>
                <p className="flex-1 text-foreground-primary text-left truncate leading-tight font-medium text-base">
                    {navigationItem.label}
                </p>
            </Link>
        </SheetClose>)
}