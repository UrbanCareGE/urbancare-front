"use client";

import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger,} from "@/components/ui/select";
import {MapPin, ChevronDown} from "lucide-react";

interface Neighborhood {
    id: string;
    name: string;
    address: string;
    image: string;
}

const neighborhoods: Neighborhood[] = [
    {
        id: "1",
        name: "Downtown",
        address: "123 Main St, City Center",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop",
    },
    {
        id: "2",
        name: "Riverside",
        address: "456 River Rd, Waterfront",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=100&h=100&fit=crop",
    },
    {
        id: "3",
        name: "Hillside",
        address: "789 Hill Ave, Heights",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    },
    {
        id: "4",
        name: "Riverside",
        address: "456 River Rd, Waterfront",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=100&h=100&fit=crop",
    },
    {
        id: "5",
        name: "Hillside",
        address: "789 Hill Ave, Heights",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    },
];

export const NeighborhoodSelect = () => {
    const [selectedNeighborhood, setSelectedNeighborhood] = React.useState<string>(neighborhoods[0].id);
    const [isOpen, setIsOpen] = React.useState(false);

    const currentNeighborhood = neighborhoods.find(n => n.id === selectedNeighborhood);

    return (
        <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood} open={isOpen} onOpenChange={setIsOpen}>
            <SelectTrigger className="w-full h-auto py-3 rounded-panel [&>svg]:hidden border border-gray-200">
                <div className="flex items-center gap-3 w-full">
                    {currentNeighborhood && (
                        <>
                            <img
                                src={currentNeighborhood.image}
                                alt={currentNeighborhood.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                <span className="font-semibold text-base text-gray-900 truncate w-full">
                                    {currentNeighborhood.name}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1 truncate w-full">
                                    <MapPin className="w-3 h-3 flex-shrink-0"/>
                                    {currentNeighborhood.address}
                                </span>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                    isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        </>
                    )}
                </div>
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] max-h-64 opacity-100 bg-white rounded-panel">
                {neighborhoods.map((neighborhood) => (
                    <SelectItem key={neighborhood.id} value={neighborhood.id} className="py-3 px-2 hover:bg-gray-100 rounded-pa">
                        <div className="flex items-center gap-3 rounded-panel">
                            <img
                                src={neighborhood.image}
                                alt={neighborhood.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col items-start min-w-0 flex-1">
                                <span className="font-semibold text-sm text-gray-900 truncate w-full">
                                    {neighborhood.name}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1 truncate w-full">
                                    <MapPin className="w-3 h-3 flex-shrink-0"/>
                                    {neighborhood.address}
                                </span>
                            </div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
