export interface Post {
  id: number;
  author: string;
  authorImage: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
  images?: string[];
}

export interface PostHeaderProps {
  author: string;
  authorImage: string;
  timestamp: string;
}

export interface PostContentProps {
  content: string;
}

export interface PostImageProps {
  image: string;
}

export interface PostImageGridProps {
  images: string[];
}

export interface PostStatsProps {
  likes: number;
  comments: number;
  shares: number;
}

export interface PostActionsProps {
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  liked: boolean;
}

export interface PostCardProps {
  post: Post;
}