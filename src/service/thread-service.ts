import { api } from '@/lib/api-client';
import {
  CreateThreadCommentDTO,
  CreateThreadDTO,
  PollVoteDTO,
  ThreadCommentDTO,
  ThreadInfoDTO,
  ThreadVoteDTO,
  ThreadVoteRespDTO,
} from '@/model/thread.dto';
import { PagingDTO, PagingRespDTO } from '@/model/common.dto';

export const ThreadService = {
  add: async (
    apartmentId: string,
    addThreadDto: CreateThreadDTO
  ): Promise<ThreadInfoDTO> => {
    const { data } = await api.post<ThreadInfoDTO, CreateThreadDTO>(
      `/api/secure/thread/${apartmentId}/create`,
      addThreadDto
    );
    return data;
  },
  get: async (threadId: string): Promise<ThreadInfoDTO> => {
    const { data } = await api.get<ThreadInfoDTO>(
      `/api/secure/thread/${threadId}`
    );
    return data;
  },
  getAll: async (
    apartmentId: string,
    paging: PagingDTO,
    tags?: string[]
  ): Promise<PagingRespDTO<ThreadInfoDTO>> => {
    const { data } = await api.get<PagingRespDTO<ThreadInfoDTO>>(
      `/api/secure/thread/list/${apartmentId}`,
      {
        params: {
          ...paging,
          ...(tags && tags.length > 0 && { tags: tags.join(',') }),
        },
      }
    );
    return data;
  },
  vote: async (
    threadId: string,
    voteDTO: ThreadVoteDTO
  ): Promise<ThreadVoteRespDTO> => {
    const { data } = await api.post<ThreadVoteRespDTO, ThreadVoteDTO>(
      `/api/secure/thread/vote/${threadId}`,
      voteDTO
    );
    return data;
  },
  createComment: async (
    threadId: string,
    commentDTO: CreateThreadCommentDTO
  ): Promise<ThreadCommentDTO> => {
    const { data } = await api.post<ThreadCommentDTO, CreateThreadCommentDTO>(
      `/api/secure/thread/${threadId}/comment`,
      commentDTO
    );
    return data;
  },
  pollVote: async (
    pollId: string,
    voteDTO: PollVoteDTO
  ): Promise<ThreadInfoDTO> => {
    const { data } = await api.post<ThreadInfoDTO, PollVoteDTO>(
      `/api/secure/poll/${pollId}/vote`,
      voteDTO
    );
    return data;
  },
};
