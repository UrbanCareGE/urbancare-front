import {FixedMasterHeader} from "@/components/common/header/FixedMasterHeader";

export default function Home() {
    return <>
        <FixedMasterHeader/>
        <main className="flex w-full h-screen  overflow-hidden">
            <div className={"h-full w-64 border-r shadow-md"}>

            </div>
            <div className={"h-full flex-1"}>

            </div>
        </main>
        <footer>

        </footer>
    </>
}