import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import Chat from "@/components/chat/Chat";
import {NavigationArea} from "@/components/home/navigation-area/NavigationArea";

export default function Home() {
    return <>
        <MasterBarHeader/>
        <main className="flex w-full h-full overflow-hidden p-2 bg-gray-100 gap-3">
            <NavigationArea/>
            <div className={"flex justify-center items-center h-full flex-[1] min-w-96 bg-opacity-0"}>
                <Chat/>
            </div>
            <div className={"h-full w-96 bg-white rounded-md"}>

            </div>
        </main>
    </>
}