'use client'

import {Monitor, Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";

const themeOptions = [
    {id: 'light', icon: Sun, label: 'ნათელი', desc: 'ღია და სუფთა'},
    {id: 'dark', icon: Moon, label: 'მუქი', desc: 'თავლებისთვის საამო'},
    {id: 'system', icon: Monitor, label: 'სისტემა', desc: 'სისტემური'}
];

export const MobileThemeSelector = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex w-full gap-2 justify-between">
            {themeOptions.map(({id, icon: Icon, label}) => (
                <Button
                    variant={'ghost'}
                    key={id}
                    onClick={() => setTheme(id)}
                    className={`h-auto flex-1 flex items-center justify-center px-2 py-3 rounded-lg transition-all ${
                        theme === id
                            ? 'bg-indigo-50 border-2 border-indigo-500'
                            : 'bg-gray-50 border-2 border-gray-200'
                    }`}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                        <Icon className={`w-6 h-6 ${
                            id === 'light' ? 'text-yellow-500' :
                                id === 'dark' ? 'text-indigo-600' :
                                    'text-gray-600'
                        }`}/>
                        <span className="text-center text-base font-base text-gray-800">{label}</span>
                    </div>
                </Button>
            ))}
        </div>
    );
};




