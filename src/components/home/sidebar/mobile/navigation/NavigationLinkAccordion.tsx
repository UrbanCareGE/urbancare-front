import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

type NavigationGroupLinkProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
}

type NavigationGroupSubLinkProps = {
    navigationItem: NavItem;
}

export const NavigationAccordionSubLink = ({navigationItem}: NavigationGroupSubLinkProps) => {
    const pathname = usePathname();

    const isActive = pathname === navigationItem.href ||
        (navigationItem.href !== '/' && pathname.startsWith(navigationItem.href));

    return <Link
        href={navigationItem.href}
        className={"h-9 group relative w-full flex items-center gap-8 px-1 transition-all duration-200"}>
        <div className={cn("h-full w-1 rounded-full", isActive ? 'bg-primary' : 'bg-primary-bg/80')}></div>
        <p className={cn(
            "text-text-primary text-left truncate font-normal text-base mr-auto",
        )}>
            {navigationItem.label}
        </p>
    </Link>
}

export const NavigationLinkAccordion = ({navigationItem}: NavigationGroupLinkProps) => {
    return (
        <Accordion type="single"
                   collapsible
                   className="w-full border-0"
                   defaultValue="item-1">
            <AccordionItem value={'item-1'} className={"border-0"}>
                <AccordionTrigger className={"p-0"}>
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
                        <p className="flex-1 text-text-primary text-left truncate font-medium text-lg">
                            {navigationItem.label}
                        </p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className={"flex p-0"}>
                    <div className={"flex flex-col w-full ml-5"}>
                        {navigationItem.children?.map(navigationItem => {
                            return <NavigationAccordionSubLink key={navigationItem.href}
                                                               navigationItem={navigationItem}/>
                        })}
                    </div>

                </AccordionContent>
            </AccordionItem>

        </Accordion>

    );
};