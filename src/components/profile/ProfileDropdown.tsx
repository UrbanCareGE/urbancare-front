'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {ChevronDown, CircleUserRound, LogOut, Settings, Wallet} from "lucide-react"
import {useState} from "react";

export function ProfileDropdown() {
    const [open, setOpen] = useState(false)
    return (
        <DropdownMenu onOpenChange={(open: boolean) => {
            setOpen(open)
        }}>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center gap-2 rounded-md border px-3 py-2 bg-white hover:bg-gray-50 transition">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Nikolai Konovalov"/>
                        <AvatarFallback>NK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-gray-700">Levan Gogichaishvili</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel>
                    My Account
                    <br/>
                    @gogicha505
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <CircleUserRound/>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings/>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Wallet/>
                    Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="text-red-600">
                    <LogOut/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
