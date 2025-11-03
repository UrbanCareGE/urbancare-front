import {UserSnapshotDTO} from "@/model/auth.dto";

export enum VoteType {
    UPVOTE = 'UPVOTE',
    DOWNVOTE = 'DOWNVOTE'
}

export interface CreateThreadDTO {
    title: string;
    content: string;
}

export interface ThreadInfoDTO {
    id: string;
    title: string;
    content: string;
    voteDiff: number;
    selfVote: number;
    userInfo: UserSnapshotDTO;
    createdAt: Date;
    updatedAt: Date;
}


export interface ThreadVoteDTO {
    voteType: VoteType;
}