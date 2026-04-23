import { FileDTO } from '@/model/dto/file.dto';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import { PollDTO, ThreadCommentDTO } from '@/model/dto/thread.dto';
import { OptimisticData, PagingRespDTO } from '@/model/dto/common.dto';
import { UserModel } from '@/model/model/user.model';

export interface ThreadModel {
  id: string;
  title: string;
  content: string;
  images: FileDTO[];
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

export type ThreadModelOptimistic = OptimisticData<UserModel>;
export type ThreadPagingModel = PagingRespDTO<ThreadModel>;
