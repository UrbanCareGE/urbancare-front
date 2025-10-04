'use client'
import {MasterBarHeader} from "@/components/common/header/MasterBarHeader";
import Chat from "@/components/chat/Chat";
import {NavigationArea} from "@/components/home/navigation-area/NavigationArea";

export default function Home() {
    return <>
        <MasterBarHeader/>
        <main className="flex w-full h-full overflow-hidden bg-gray-100 gap-8 px-8 pb-5">
            <NavigationArea/>

            <div className={"flex justify-center items-center h-full flex-1 min-w-96"}>
                <Chat/>
            </div>

            <div className={"h-full w-80 bg-white rounded-panel"}>
            </div>
        </main>
    </>
}