import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { PostActionsProps } from "./types";

export function PostActions({ onLike, onComment, onShare, liked }: PostActionsProps) {
  return (
    <div className="flex items-center justify-around px-2 py-1">
      <button
        onClick={onLike}
        className={`flex items-center justify-center gap-2 flex-1 py-2 rounded-md hover:bg-gray-100 transition-colors ${
          liked ? 'text-primary font-semibold' : 'text-gray-600'
        }`}
      >
        <ThumbsUp className={`w-[18px] h-[18px] ${liked ? 'fill-primary' : ''}`} />
        <span className="text-sm font-medium">მოწონება</span>
      </button>
      <button
        onClick={onComment}
        className="flex items-center justify-center gap-2 flex-1 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
      >
        <MessageSquare className="w-[18px] h-[18px]" />
        <span className="text-sm font-medium">კომენტარი</span>
      </button>
      <button
        onClick={onShare}
        className="flex items-center justify-center gap-2 flex-1 py-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
      >
        <Share2 className="w-[18px] h-[18px]" />
        <span className="text-sm font-medium">გაზიარება</span>
      </button>
    </div>
  );
}