import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { PostHeader } from "./PostHeader";
import { PostContent } from "./PostContent";
import { PostImage } from "./PostImage";
import { PostImageGrid } from "./PostImageGrid";
import { PostStats } from "./PostStats";
import { PostActions } from "./PostActions";
import { PostCardProps } from "./types";

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleComment = () => {
    // TODO: Implement comment functionality
  };
  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <PostHeader
        author={post.author}
        authorImage={post.authorImage}
        timestamp={post.timestamp}
      />

      <PostContent content={post.content} />

      {post.image && <PostImage image={post.image} />}

      {post.images && <PostImageGrid images={post.images} />}

      <PostStats
        likes={post.likes}
        comments={post.comments}
        shares={post.shares}
      />

      <Separator />

      <PostActions
        onLike={handleLike}
        onComment={handleComment}
        onShare={handleShare}
        liked={liked}
      />
    </div>
  );
}