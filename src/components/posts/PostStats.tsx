import { ThumbsUp } from "lucide-react";
import { PostStatsProps } from "./types";

export function PostStats({ likes, comments, shares }: PostStatsProps) {
  const hasStats = likes > 0 || comments > 0 || shares > 0;
  if (!hasStats) return null;

  return (
    <div className="px-4 pb-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          {likes > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-primary">
                <ThumbsUp className="w-[10px] h-[10px] text-white fill-white" />
              </div>
              <span className="hover:underline cursor-pointer">{likes}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {comments > 0 && (
            <span className="hover:underline cursor-pointer">
              {comments} კომენტარი
            </span>
          )}
          {shares > 0 && (
            <span className="hover:underline cursor-pointer">
              {shares} გაზიარება
            </span>
          )}
        </div>
      </div>
    </div>
  );
}