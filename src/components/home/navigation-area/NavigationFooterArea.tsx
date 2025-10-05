import {UserAvatarInfo} from "@/components/common/avatar/UserAvatarInfo";
import {LogOutIcon} from "lucide-react";

export const NavigationFooterArea = () => {
    return (
        <div className={"w-full flex h-16 items-center justify-between p-1 bg-white rounded-panel"}>
            <UserAvatarInfo firstName={"Levan"} lastName={"Gogichaishvili"} username={"gogicha505"}/>
            <LogOutIcon stroke={"black"}/>
        </div>
    );
};