import {Button} from "@/components/ui/button";
import {LogOutIcon} from "lucide-react";
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
        <Button className={"w-full bg-error font-semibold text-base"} onClick={handleLogout}>
            გასვლა
            <LogOutIcon/>
        </Button>
    );
};
