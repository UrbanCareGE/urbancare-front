import {Menu} from "lucide-react";
import {ActiveUserAvatar} from "@/components/common/avatar/ActiveUserAvatar";
import {CgFacebook} from "react-icons/cg";
import {NeighborhoodSelect} from "@/components/home/NeighborhoodSelect";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";

export const MobileHeader = () => {
    return (
        <div>
            <div className={"h-20 flex items-center px-4 bg-green-400"}>
                <Menu className={"w-8 h-8 "}/>
                {/*<span className={"ml-4 font-semibold text-3xl mr-auto"}>URBANCARE</span>*/}\
                <NeighborhoodSelect/>
                <ActiveUserAvatar/>
            </div>
            <Select>
                <SelectTrigger className={"h-12 bg-amber-950 "}>
                    <button>
                        თბილისი, პ. ქავთარაძის 34გ
                    </button>
                </SelectTrigger>
                <SelectContent className={"bg-white"}>
                    <SelectItem key={1} value={"1"}>
                        AAAAA
                    </SelectItem>
                    <SelectItem key={2} value={"2"}>
                        AAAAA
                    </SelectItem>
                    <SelectItem key={3} value={"3"}>
                        AAAAA
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
