import { NavigationButton } from "./NavigationButton";

const navigationItems = [
    { href: "/", label: "სერვისები", icon: "🏠" },
    { href: "/urgent", label: "ზოგადი სერვისები", icon: "🚨" },
    { href: "/services", label: "ფინანსები", icon: "🔧" },
    { href: "/bla", label: "მოთხოვნები", icon: "👥" },
    { href: "/blu", label: "სიახლეები", icon: "🔔" },
    { href: "/pla", label: "განცხადებები", icon: "👥" },
    { href: "/plu", label: "საპორტი", icon: "🔔" },
];

export const NavigationArea = () => {
    return (
        <div className="flex flex-col gap-2 w-full h-full">
            {navigationItems.map((item) => (
                <NavigationButton
                    key={item.href}
                    href={item.href}
                    className=""
                >
                    <span className="font-bold tracking-wide text-lg text-gray-700 mr-auto">{item.label}</span>
                    <span className="mr-3">{item.icon}</span>
                </NavigationButton>
            ))}
        </div>
    );
};
