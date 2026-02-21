import { UserSnapshotDTO } from '@/model/dto/auth.dto';

export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export interface CreateThreadDTO {
  title: string;
  content: string;
  imageIds: string[];
  tags?: string[];
  poll?: string[];
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

export const ALL_TAGS = Object.values(ThreadTagType);

export type ThreadTagValue = (typeof ThreadTagType)[keyof typeof ThreadTagType];

export const ThreadTagConfig: Record<
  ThreadTagValue,
  { bg: string; text: string; label: string }
> = {
  [ThreadTagType.ANNOUNCEMENT]: {
    bg: 'bg-primary/20',
    text: 'text-primary',
    label: 'განცხადება',
  },
  [ThreadTagType.QUESTION]: {
    bg: 'bg-secondary/20',
    text: 'text-secondary',
    label: 'კითხვა',
  },
  [ThreadTagType.DISCUSSION]: {
    bg: 'bg-success/20',
    text: 'text-success',
    label: 'დისკუსია',
  },
  [ThreadTagType.ISSUE]: {
    bg: 'bg-error/20',
    text: 'text-error',
    label: 'პრობლემა',
  },
  [ThreadTagType.SUGGESTION]: {
    bg: 'bg-warning/20',
    text: 'text-warning',
    label: 'შემოთავაზება',
  },
  [ThreadTagType.EVENT]: {
    bg: 'bg-secondary/20',
    text: 'text-secondary',
    label: 'ღონისძიება',
  },
  [ThreadTagType.URGENT]: {
    bg: 'bg-error/20',
    text: 'text-error',
    label: 'სასწრაფო',
  },
  [ThreadTagType.POLL]: {
    bg: 'bg-info/20',
    text: 'text-info',
    label: 'გამოკითხვა',
  },
  [ThreadTagType.INFO]: {
    bg: 'bg-info/20',
    text: 'text-info',
    label: 'ინფორმაცია',
  },
  [ThreadTagType.MAINTENANCE]: {
    bg: 'bg-warning/20',
    text: 'text-warning',
    label: 'ტექნიკური',
  },
};

export interface ThreadInfoDTO {
  id: string;
  title: string;
  content: string;
  imageIds: string[];
  voteDiff: number;
  commentCount: number;
  selfVote: number;
  comments: ThreadCommentDTO[];
  createdAt: Date;
  userInfo?: UserSnapshotDTO;
  poll?: PollDTO;
  tags?: string[];
  reactions?: PollDTO;
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
}
