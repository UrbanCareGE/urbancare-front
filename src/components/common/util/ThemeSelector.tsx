'use client'

import {Check, Monitor, Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";

const themeOptions = [
    {id: 'light', icon: Sun, label: 'ნათელი', desc: 'ღია და სუფთა'},
    {id: 'dark', icon: Moon, label: 'მუქი', desc: 'თავლებისთვის საამო'},
    {id: 'system', icon: Monitor, label: 'სისტემური', desc: 'სისტემური'}
];

export const ThemeSelector = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-2">
            {themeOptions.map(({id, icon: Icon, label, desc}) => (
                <Button
                    variant={'ghost'}
                    key={id}
                    onClick={() => setTheme(id)}
                    className={`h-auto w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        theme === id
                            ? 'bg-indigo-50 border-2 border-indigo-500'
                            : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${
                            id === 'light' ? 'text-yellow-500' :
                                id === 'dark' ? 'text-indigo-600' :
                                    'text-gray-600'
                        }`}/>
                        <div className="text-left">
                            <p className="text-lg font-base text-gray-800">{label}</p>
                            <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                    </div>
                    {theme === id && (
                        <Check className="w-5 h-5 text-indigo-600"/>
                    )}
                </Button>
            ))}
        </div>
    );
};




