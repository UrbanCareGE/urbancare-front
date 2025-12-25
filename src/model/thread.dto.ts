import {UserSnapshotDTO} from "@/model/auth.dto";

export enum VoteType {
    UPVOTE = 'UPVOTE',
    DOWNVOTE = 'DOWNVOTE'
}

export interface CreateThreadDTO {
    title: string;
    content: string;
    imageIds: string[];
    tags?: string[];
    poll?: {
        title: string;
        items: string[] | undefined;
    };
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
    userInfo: UserSnapshotDTO;
    replies?: ThreadCommentDTO[];
    replyToId?: string;
}

export const ThreadTagType = {
    ANNOUNCEMENT: 'ANNOUNCEMENT',
    QUESTION: 'QUESTION',
    DISCUSSION: 'DISCUSSION',
    ISSUE: 'ISSUE',
    SUGGESTION: 'SUGGESTION',
    EVENT: 'EVENT',
    URGENT: 'URGENT',
    POLL: 'POLL',
    INFO: 'INFO',
    MAINTENANCE: 'MAINTENANCE',
} as const;

export type ThreadTagValue = typeof ThreadTagType[keyof typeof ThreadTagType];

export const ThreadTagConfig: Record<ThreadTagValue, { bg: string; text: string; label: string }> = {
    [ThreadTagType.ANNOUNCEMENT]: {bg: 'bg-blue-500/20', text: 'text-blue-600', label: 'განცხადება'},
    [ThreadTagType.QUESTION]: {bg: 'bg-purple-500/20', text: 'text-purple-600', label: 'კითხვა'},
    [ThreadTagType.DISCUSSION]: {bg: 'bg-emerald-500/20', text: 'text-emerald-600', label: 'დისკუსია'},
    [ThreadTagType.ISSUE]: {bg: 'bg-red-500/20', text: 'text-red-600', label: 'პრობლემა'},
    [ThreadTagType.SUGGESTION]: {bg: 'bg-amber-500/20', text: 'text-amber-600', label: 'შემოთავაზება'},
    [ThreadTagType.EVENT]: {bg: 'bg-pink-500/20', text: 'text-pink-600', label: 'ღონისძიება'},
    [ThreadTagType.URGENT]: {bg: 'bg-rose-500/20', text: 'text-rose-600', label: 'სასწრაფო'},
    [ThreadTagType.POLL]: {bg: 'bg-indigo-500/20', text: 'text-indigo-600', label: 'გამოკითხვა'},
    [ThreadTagType.INFO]: {bg: 'bg-cyan-500/20', text: 'text-cyan-600', label: 'ინფორმაცია'},
    [ThreadTagType.MAINTENANCE]: {bg: 'bg-orange-500/20', text: 'text-orange-600', label: 'ტექნიკური'},
};

export interface ThreadInfoDTO {
    id: string;
    title: string;
    content: string;
    imageIds: string[];
    voteDiff: number;
    commentCount: number;
    selfVote: number;
    comments: ThreadCommentDTO[]
    createdAt: Date;
    userInfo?: UserSnapshotDTO;
    poll?: PollDTO;
    tags?: string[];
    reactions: PollDTO;
}

export interface ThreadVoteDTO {
    voteType: VoteType;
}

export interface PollVoteDTO {
    pollItemId: string;
}

export interface ThreadVoteRespDTO {
    voteDiff: number;
}

export interface PollVoterDTO {
    id: string;
}

export interface PollOptionDTO {
    id: string;
    content: string;
    voteCount: number;
    voters: UserSnapshotDTO[];
}

export interface PollDTO {
    id: string;
    items: PollOptionDTO[];
    editable?: boolean;
}
