import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";

interface ThreadCardContentProps {
    className?: string;
}

export const ThreadCardContent = ({className}: ThreadCardContentProps) => {
    const thread = useThread();
    return (
        <div className={"flex flex-col w-full"}>
            <div className="px-5 pb-3">
                {thread.title && (
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">
                        {thread.title}
                    </h2>
                )}
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {thread.content}
                </p>
            </div>
            {/* Image */}
            {/*{thread.image && (*/}
            {/*    <div className="px-3 pb-3">*/}
            {/*        <img*/}
            {/*            src={post.image}*/}
            {/*            alt="Post content"*/}
            {/*            className="w-full rounded-2xl object-cover max-h-80"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* Video */}
            {/*{post.video && (*/}
            {/*    <div className="px-3 pb-3">*/}
            {/*        <video*/}
            {/*            src={post.video}*/}
            {/*            controls*/}
            {/*            className="w-full rounded-2xl object-cover max-h-80 bg-black"*/}
            {/*        >*/}
            {/*            Your browser does not support the video tag.*/}
            {/*        </video>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>

    );
};
