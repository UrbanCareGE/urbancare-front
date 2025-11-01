import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import type {FilterType} from "@/components/posts/types";
import {cn} from "@/lib/utils";
import {useMobileScroll} from "@/hooks/use-mobile-scroll";
import {AddThreadButton} from "@/components/posts/mobile/AddThreadButton";

const filters: { value: FilterType; label: string; icon: React.ElementType }[] = [
    // {value: 'hot', label: 'Hot', icon: Flame},
    // {value: 'new', label: 'New', icon: Clock},
    // {value: 'top', label: 'Top', icon: Star},
];

const ThreadHeader = () => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('hot');
    const {isVisible} = useMobileScroll()

    return (
        <header
            className={cn("flex items-center w-full fixed top-0 left-0 right-0 z-[10] px-3 py-1 bg-slate-50 transition-transform duration-300 ease-in-out will-change-transform ", isVisible ? "translate-y-20" : "-translate-y-20")}>
            <div className="w-auto mr-auto px-4 py-1">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <Button
                                key={filter.value}
                                variant={activeFilter === filter.value ? 'default' : 'secondary'}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`gap-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                    activeFilter === filter.value
                                        ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                <Icon className="w-4 h-4"/>
                                {filter.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <AddThreadButton/>
        </header>
    );
};


export default ThreadHeader;