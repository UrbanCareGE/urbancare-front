import {NavItem} from "@/components/home/sidebar/mobile/navigation/NavigationArea";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {NavigationSubLink} from "@/components/home/sidebar/mobile/navigation/NavigationSubLink";

type NavigationGroupLinkProps = {
    navigationItem: NavItem;
    children?: ReactNode;
    className?: string;
}

export const NavigationLinkAccordion = ({navigationItem}: NavigationGroupLinkProps) => {
    return (
        <Accordion type="single"
                   collapsible
                   className="w-full border-0">
            <AccordionItem value={'item-1'} className={"border-0"}>
                <AccordionTrigger className={"p-0"}>
                    <div
                        className={"h-9 group relative flex items-center gap-2 transition-all duration-200 px-1"}>
                        {navigationItem.icon && (
                            <div className={cn(
                                "flex-shrink-0 transition-all duration-200 p-2 flex justify-center items-center rounded-panel", navigationItem.className)}>
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
                        {navigationItem.children?.map(navigationItem => {
                            return <NavigationSubLink key={navigationItem.href}
                                                      navigationItem={navigationItem}/>
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};