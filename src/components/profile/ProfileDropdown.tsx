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
import {CircleUserRound, LogOut, Settings, Wallet, ChevronDown} from "lucide-react"

export function ProfileDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="relative rounded-full ring-2 ring-primary ring-offset-2 focus:outline-none transition-transform active:scale-95">
                    <Avatar className="h-10 w-10 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User"/>
                        <AvatarFallback>NK</AvatarFallback>
                    </Avatar>
                    <ChevronDown
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-100 text-gray-600 rounded-full p-0.5"/>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 bg-white rounded-panel">
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
