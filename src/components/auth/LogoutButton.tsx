'use client'

import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import {useAuth} from "@/components/provider/AuthProvider";
import {Spinner} from "@/components/ui/spinner";
import React from "react";

export const LogoutButton = () => {
    const {logOut, isLoggingOut} = useAuth();

    const handleLogout = () => {
        logOut()
    }
    return (
        <Button
            className="flex w-full items-center justify-center gap-2 px-4 py-1 bg-error-container text-error rounded-panel font-medium text-base"
            onClick={handleLogout}
            disabled={isLoggingOut}
        >
            <LogOut className="w-5 h-5"/>
            გასვლა
            {isLoggingOut && <Spinner/>}
        </Button>
    );
};
