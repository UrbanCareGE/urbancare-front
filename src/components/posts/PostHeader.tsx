import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Globe, MoreHorizontal } from "lucide-react";
import { PostHeaderProps } from "./types";

export function PostHeader({ author, authorImage, timestamp }: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage src={authorImage} alt={author} />
          <AvatarFallback className="bg-primary text-white">
            {author.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-sm hover:underline cursor-pointer">
            {author}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{timestamp}</span>
            <span>·</span>
            <Globe className="w-3 h-3" />
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </Button>
    </div>
  );
}