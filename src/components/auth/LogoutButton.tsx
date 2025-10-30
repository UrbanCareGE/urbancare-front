'use client'

import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {AuthService} from "@/service/auth-service";
import {useRouter} from "next/navigation";

export const LogoutButton = () => {
    const router = useRouter()
    const mutation = useMutation(
        {
            mutationFn: AuthService.logout,
            onSuccess: (data) => {
                router.push('/')
            }
        }
    );

    const handleLogout = () => {
        mutation.mutate()
    }
    return (
        <div className="w-full p-1 border-gray-200 bg-gray-50">
            <Button
                className="w-full flex items-center justify-center gap-3 px-4 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-panel transition-colors font-medium text-base"
                onClick={handleLogout}
            >
                <LogOut className="w-5 h-5"/>
                გასვლა
            </Button>
        </div>
    );
};
