import {NavigationHeaderArea} from "@/components/home/navigation-area/NavigationHeaderArea";
import {NavigationMainArea} from "@/components/home/navigation-area/NavigationMainArea";
import {NavigationFooterArea} from "@/components/home/navigation-area/NavigationFooterArea";

export const NavigationArea = () => {
    return (
        <div className={"flex flex-col gap-4 justify-start items-center h-full w-64"}>
            <NavigationHeaderArea/>
            <NavigationMainArea/>
            <NavigationFooterArea/>
        </div>
    );
};

