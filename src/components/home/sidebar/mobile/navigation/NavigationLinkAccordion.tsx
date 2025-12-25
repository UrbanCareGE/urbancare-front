import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {ReactNode, useState} from "react";
import {cn} from "@/lib/utils";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {NavigationSubLink} from "@/components/home/sidebar/mobile/navigation/NavigationSubLink";
import Link from "next/link";
import {SheetClose} from "@/components/ui/sheet";
import {ChevronRight} from "lucide-react";

type NavigationGroupLinkProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
}

export const NavigationLinkAccordion = ({navigationItem}: NavigationGroupLinkProps) => {
    const {navigable} = navigationItem;
    const [isOpen, setIsOpen] = useState(false);

    if (navigable) {
        return (
            <Accordion type="single"
                       collapsible
                       value={isOpen ? 'item-1' : ''}
                       className="w-full border-0">
                <AccordionItem value={'item-1'} className={"border-0"}>
                    <div className={"h-9 group relative flex items-center gap-2 transition-all duration-200 pl-1"}>
                        <SheetClose asChild>
                            <Link href={navigationItem.href} className="flex items-center gap-2 flex-1">
                                <div className={cn(
                                    "flex-shrink-0 transition-all duration-200 p-2 flex justify-center items-center rounded-panel",
                                    navigationItem.className
                                )}>
                                    {navigationItem.icon}
                                </div>
                                <span className="text-left truncate leading-tight font-medium text-lg">
                                    {navigationItem.label}
                                </span>
                            </Link>
                        </SheetClose>
                        <button
                            type="button"
                            onClick={() => setIsOpen(prev => !prev)}
                            className="p-0 w-12 h-full transition-colors flex justify-end items-center"
                        >
                            <ChevronRight className={cn("h-6 w-6 shrink-0 text-sky-950 transition-transform duration-200", {"rotate-90": isOpen})}/>
                        </button>
                    </div>
                    <AccordionContent className={"flex p-0 py-2"}>
                        <div className={"flex flex-col ml-5"}>
                            {navigationItem.children?.map(child => {
                                return <NavigationSubLink
                                    key={navigationItem.href + child.href}
                                    parentHref={navigationItem.href}
                                    child={child}/>
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    }

    return (
        <Accordion type="single"
                   collapsible
                   className="w-full border-0">
            <AccordionItem value={'item-1'} className={"border-0"}>
                <AccordionTrigger className={"p-0"}>
                    <div className={"h-9 group relative flex items-center gap-2 transition-all duration-200 px-1"}>
                        {navigationItem.icon && (
                            <div className={cn(
                                "flex-shrink-0 transition-all duration-200 p-2 flex justify-center items-center rounded-panel",
                                navigationItem.className
                            )}>
                                {navigationItem.icon}
                            </div>
                        )}
                        <p className="flex-1 text-left truncate leading-tight font-medium text-lg">
                            {navigationItem.label}
                        </p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className={"flex p-0 py-2"}>
                    <div className={"flex flex-col ml-5"}>
                        {navigationItem.children?.map(child => {
                            return <NavigationSubLink
                                key={navigationItem.href + child.href}
                                parentHref={navigationItem.href}
                                child={child}/>
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};