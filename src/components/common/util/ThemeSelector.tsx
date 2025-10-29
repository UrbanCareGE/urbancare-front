'use client'

import {Monitor, Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";

const themeOptions = [
    {id: 'light', label: 'ნათელი', icon: Sun},
    {id: 'dark', label: 'მუქი', icon: Moon},
    {id: 'system', label: 'სისტემური', icon: Monitor}
];


export const ThemeSelector = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="py-2">
            <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = theme === option.id;
                    return (
                        <Button
                            key={option.id}
                            onClick={() => setTheme(option.id)}
                            className={`h-auto flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                                isActive
                                    ? 'bg-gray-900 border-gray-900 text-white'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className="w-5 h-5"/>
                            <span className="text-md font-medium">
                      {option.label}
                    </span>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};




