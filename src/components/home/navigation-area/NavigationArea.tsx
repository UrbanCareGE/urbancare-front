import {NavigationHeaderArea} from "@/components/home/navigation-area/NavigationHeaderArea";
import {NavigationMainArea} from "@/components/home/navigation-area/NavigationMainArea";
import {NavigationFooterArea} from "@/components/home/navigation-area/NavigationFooterArea";



export const NavigationArea = () => {
    return (
        <div className={"w-full flex flex-col justify-between items-center h-full gap-8"}>
            {/*<NavigationHeaderArea/>*/}
            <NavigationMainArea/>
            {/*<NavigationFooterArea/>*/}
        </div>
    );
};