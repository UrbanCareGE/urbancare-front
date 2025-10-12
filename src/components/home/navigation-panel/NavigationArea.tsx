import { NavigationButton } from "./NavigationButton";
import {cn} from "@/lib/utils";

interface NavItem {
    href: string;
    label: string;
    icon: string;
    children?: NavItem[];
}

export const navigationItems: NavItem[] = [
    { href: "/", label: "სერვისები", icon: "🏠", children: [
            { href: "/bla1", label: "მოთხოვნები", icon: "👥", children: [
                    { href: "/bla3", label: "მოთხოვნები", icon: "👥", children: [
                            { href: "/blu4", label: "სიახლეები", icon: "🔔" },
                            { href: "/pla4", label: "განცხადებები", icon: "👥", children: [
                                    { href: "/blu5", label: "სიახლეები", icon: "🔔", children: [
                                            { href: "/blu6", label: "სიახლეები", icon: "🔔" },
                                            { href: "/pla6", label: "განცხადებები", icon: "👥" },
                                            { href: "/plu6", label: "საპორტი", icon: "🔔" }
                                        ] },
                                    { href: "/pla5", label: "განცხადებები", icon: "👥" },
                                    { href: "/plu5", label: "საპორტი", icon: "🔔", children: [
                                            { href: "/blu7", label: "სიახლეები", icon: "🔔", children: [
                                                    { href: "/blu11", label: "სიახლეები", icon: "🔔" },
                                                    { href: "/pla11", label: "განცხადებები", icon: "👥" },
                                                    { href: "/plu11", label: "საპორტი", icon: "🔔" }
                                                ] },
                                            { href: "/pla7", label: "განცხადებები", icon: "👥" },
                                            { href: "/plu7", label: "საპორტი", icon: "🔔" }
                                        ] }
                                ] },
                            { href: "/plu4", label: "საპორტი", icon: "🔔" }
                        ] },
                    { href: "/blu3", label: "სიახლეები", icon: "🔔" }
                ] },
            { href: "/blu1", label: "სიახლეები", icon: "🔔" },
            { href: "/pla1", label: "განცხადებები", icon: "👥" },
        ], },
    { href: "/urgent", label: "ზოგადი სერვისები", icon: "🚨" },
    { href: "/services", label: "ფინანსები", icon: "🔧" },
    { href: "/bla", label: "მოთხოვნები", icon: "👥", children: [
            { href: "/bla2", label: "მოთხოვნები", icon: "👥" },
            { href: "/blu2", label: "სიახლეები", icon: "🔔" },
            { href: "/pla2", label: "განცხადებები", icon: "👥" },
        ] },
    { href: "/blu", label: "სიახლეები", icon: "🔔" },
    { href: "/pla", label: "განცხადებები", icon: "👥" },
    { href: "/plu", label: "საპორტი", icon: "🔔", children: [
            { href: "/blu8", label: "სიახლეები", icon: "🔔" },
            { href: "/pla8", label: "განცხადებები", icon: "👥" },
            { href: "/plu8", label: "საპორტი", icon: "🔔" }
        ] },
];

export const NavigationArea = ({items}: {items: NavItem[]}) => {
    return (
        <div className="flex flex-col w-full h-full">
            {items.map((item, index) => (
                item.children == undefined
                    ? <ComponentItem key={item.href} item={item} index={index} size={items.length - 1}/>
                    : <div key={item.href} className={"flex flex-col"}>
                        <ComponentItem key={item.href} item={item} index={index} size={items.length - 1}/>
                        <div className={cn("pl-8 ml-1", {"border-l-2 border-gray-300": index !== items.length - 1})}>
                            <NavigationArea items={item.children}/>
                        </div>
                    </div>
            ))}
        </div>
    );
};

export const ComponentItem = ({item, index, size}: {item: NavItem, index: number, size: number}) => {
    //, { "border-l-2": index === size }
    return (
        <div key={item.href} className={"flex items-center"}>
            <div className={cn("flex box-border flex-col border-gray-300 items-center h-full justify-center ml-1", { "border-l-2": index !== size })}>

                <div className={cn("flex-1 box-border border-solid border-s-2  border-tone-4  border-b-2 border-gray-300 rounded-es-lg w-5", {"relative left-[-2px]": index !== size })}>

                </div>
                <div className={"flex-1 w-4"}></div>
            </div>
            <NavigationButton
                href={item.href}
            >
                <span className="font-bold tracking-wide text-lg text-gray-700 mr-auto">{item.label}</span>
                <span className="mr-3">{item.icon}</span>
            </NavigationButton>
        </div>
    );
};
