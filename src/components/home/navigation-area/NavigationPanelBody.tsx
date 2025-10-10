'use client'

import {
    Bell,
    Bookmark,
    Calendar,
    Compass,
    FileText,
    Heart,
    Home,
    Map,
    MessageSquare,
    Search,
    TrendingUp,
    Users
} from "lucide-react"
import {Button} from "@/components/ui/button"

const navItems = [
    { icon: Home, label: "Home" },
    { icon: Compass, label: "Explore" },
    { icon: Search, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Users, label: "Community" },
    { icon: Calendar, label: "Events" },
    { icon: Map, label: "Local Map" },
    { icon: TrendingUp, label: "Trending" },
    { icon: Bookmark, label: "Saved" },
    { icon: FileText, label: "Reports" },
    { icon: Heart, label: "Favorites" },
]

export const NavigationPanelBody = () => {
    return (
        <div className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
                const Icon = item.icon
                return (
                    <Button
                        key={item.label}
                        variant="ghost"
                        className="w-full justify-start gap-3 h-auto py-3 px-4 rounded-lg hover:bg-gray-100 active:scale-98 transition-transform"
                    >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                            {item.label}
                        </span>
                    </Button>
                )
            })}
        </div>
    );
};
