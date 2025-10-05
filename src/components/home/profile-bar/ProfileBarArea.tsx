import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";
import {Bell, MessageCircleMore, Newspaper, Settings} from "lucide-react";
import {ProfileBarButton} from "@/components/home/profile-bar/ProfileBarButton";
import {ProfileDropdown} from "@/components/profile/ProfileDropdown";


export const ProfileBarArea = () => {
    return <ProfileDropdown/>
    // return (
    //     <div className={"flex w-full h-full justify-between items-center"}>
    //         {/*<ActiveUserAvatar/>*/}
    //         {/*<div className={"flex gap-2"}>*/}
    //             {/*<ProfileBarButton logo={<MessageCircleMore/>} href={""}/>*/}
    //             {/*<ProfileBarButton logo={<Bell/>} href={""}/>*/}
    //             {/*<ProfileBarButton logo={<Newspaper/>} href={""}/>*/}
    //             {/*<ProfileBarButton logo={<Settings/>} href={""}/>*/}
    //         {/*</div>*/}
    //     </div>
    // );
};
