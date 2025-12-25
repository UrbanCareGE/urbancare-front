import {NavChildItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {SheetClose} from "@/components/ui/sheet";

type NavigationSubLinkProps = {
    parentHref: string;
    child: NavChildItem;
}

export const NavigationSubLink = ({parentHref, child}: NavigationSubLinkProps) => {
    const pathname = usePathname();
    const fullHref = `${parentHref}/${child.href}`;

    const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);

    return (
        <SheetClose asChild>
            <Link
                href={fullHref}
                className={"h-7 group relative flex items-center gap-9 px-1 border-l"}>
                <div className={cn("h-full w-1 rounded-full", isActive ? 'bg-primary' : 'bg-primary-bg/80')}></div>
                <p className="flex-1 text-foreground-primary text-left truncate leading-tight font-medium text-base">
                    {child.label}
                </p>
            </Link>
        </SheetClose>)
}