import {UserSnapshotDTO} from "@/model/auth.dto";

export enum VoteType {
    UPVOTE = 'UPVOTE',
    DOWNVOTE = 'DOWNVOTE'
}

export interface CreateThreadDTO {
    title: string;
    content: string;
    imageIds: string[];
}

export interface CreateThreadCommentDTO {
    content: string;
    replyToId?: string;
}

export interface ThreadCommentDTO {
    id: string;
    content: string;
    voteDiff: number;
    selfVote: number;
    createdAt: Date;
    updatedAt: Date;
    userInfo: UserSnapshotDTO;
    replies: ThreadCommentDTO[];
}

export interface ThreadInfoDTO {
    id: string;
    title: string;
    content: string;
    imageIds: string[];
    voteDiff: number;
    commentCount: number;
    selfVote: number;
    comments?: ThreadCommentDTO[]
    createdAt: Date;
    userInfo?: UserSnapshotDTO;
}

export interface ThreadVoteDTO {
    voteType: VoteType;
}

export interface ThreadVoteRespDTO {
    voteDiff: number;
}
