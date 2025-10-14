import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {ShieldAlert} from "lucide-react";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {UrgentService} from "@/service/urgent-service";

export function UrgentPreviewMobile() {
    return (
        <div className={"bg-blue-950 flex flex-1"}></div>
    )
}

export default function UrgentPreview() {
    const {data: urgentItems, isLoading, error} = useQuery({
        queryKey: ["urgentList"],
        queryFn: UrgentService.getApartmentList,
    });

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Title row */}
            <div className="h-14 flex items-center px-4">
                <ShieldAlert className={"w-6 h-6"}/>
                <div className={"font-semibold ml-3"}>სასწრაფო</div>
                <Link href={"/urgent"} className="ml-auto h-8 rounded px-3 flex items-center bg-blue-500 text-white">
                    + დამატება
                </Link>
            </div>

            {/* List of elements - scrollable */}
            <ul className="overflow-y-auto flex flex-col flex-1 gap-2.5 pb-2.5 min-h-0">
                {isLoading && (
                    <div className="flex items-center justify-center p-4 text-gray-500">
                        Loading...
                    </div>
                )}
                {error && (
                    <div className="flex items-center justify-center p-4 text-red-500">
                        Error loading urgent items
                    </div>
                )}
                {urgentItems?.map((item) => (
                    <li key={item.id} className={"flex flex-col justify-evenly ml-4 mr-3.5 border border-gray-200 rounded-lg"}>
                        <div className="font-medium flex items-center px-3 py-2 bg-blue-300/10">
                            <span>{item.userId}</span>
                            <Button variant={"outline"} className="ml-auto h-8 px-3 rounded-lg">შესრულებულია</Button>
                        </div>
                        <Separator className={"bg-blue-900"}/>
                        <span className="text-sm text-gray-600 px-3 py-2">{item.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
