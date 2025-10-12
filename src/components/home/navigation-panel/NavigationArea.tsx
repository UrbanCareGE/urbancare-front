


import { NavigationButton } from "./NavigationButton";

const navigationItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/urgent", label: "Urgent", icon: "🚨" },
    { href: "/services", label: "Services", icon: "🔧" },
    { href: "/community", label: "Community", icon: "👥" },
    { href: "/notifications", label: "Notifications", icon: "🔔" },
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
