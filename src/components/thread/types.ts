export interface Author {
    name: string;
    username: string;
    neighborhood: string;
    avatar: string;
}

export interface Post {
    id: number;
    content: string;
    title?: string;
    image?: string;
    video?: string;
    author: Author;
    category: string;
    categoryColor: string;
    votes: number;
    comments: number;
    createdAt: string;
}

export type VoteStatus = 'up' | 'down' | null;
export type FilterType = 'hot' | 'new' | 'top';