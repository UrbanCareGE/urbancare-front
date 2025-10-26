"use client";

import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger,} from "@/components/ui/select";
import {ChevronDown, MapPin} from "lucide-react";
import {useAuth} from "@/components/provider/AuthProvider";

export const NeighborhoodSelect = () => {
    const {isLoading, selectApartment, user} = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    if (isLoading) {
        return (
            <div className="w-full h-auto py-3 px-4 rounded-panel border border-gray-200 bg-white">
                <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0">
                    <span className="font-semibold text-base text-gray-500">
                        Loading neighborhoods...
                    </span>
                        <span className="text-xs text-gray-400">
                        Please wait
                    </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full py-3 px-4 rounded-panel border border-red-200 bg-red-50">
                <span className="text-sm text-red-600">Unable to load user data</span>
            </div>
        );
    }

    const {joinedApartments, selectedApartment} = user;

    return (
        <Select value={selectedApartment?.id} onValueChange={(val) => {
            const apt = joinedApartments.find(e => e.id === val)
            selectApartment(apt!)
        }
        } open={isOpen} onOpenChange={setIsOpen}>
            <SelectTrigger className="w-full h-auto py-3 rounded-panel [&>svg]:hidden border border-gray-200">
                <div className="flex items-center gap-3 w-full">
                    {selectedApartment && (
                        <>
                            <img
                                src={"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=100&h=100&fit=crop"}
                                alt={selectedApartment.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col items-start text-left flex-1 min-w-0">
                                <span className="font-semibold text-base text-gray-900 truncate w-full">
                                    {selectedApartment.name}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1 truncate w-full">
                                    <MapPin className="w-3 h-3 flex-shrink-0"/>
                                    {selectedApartment.name}
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
            <SelectContent
                className="w-[var(--radix-select-trigger-width)] max-h-64 opacity-100 bg-white rounded-panel">
                {joinedApartments.map((neighborhood) => (
                    <SelectItem key={neighborhood.id} value={neighborhood.id}
                                className="py-3 px-2 hover:bg-gray-100 rounded-pa">
                        <div className="flex items-center gap-3 rounded-panel">
                            <img
                                src={"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=100&h=100&fit=crop"}
                                alt={neighborhood.name}
                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col items-start min-w-0 flex-1">
                                <span className="font-semibold text-sm text-gray-900 truncate w-full">
                                    {neighborhood.name}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1 truncate w-full">
                                    <MapPin className="w-3 h-3 flex-shrink-0"/>
                                    {neighborhood.name}
                                </span>
                            </div>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
