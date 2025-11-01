import ThreadFeed from "@/components/posts/mobile/ThreadFeed";

export default function PostPage() {
    return <div className={"flex flex-col gap-4 w-full bg-gray-50 overflow-scroll"}>
        <ThreadFeed/>
    </div>
}