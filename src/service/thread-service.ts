import { api } from '@/lib/api-client';
import {
  CreateThreadCommentDTO,
  CreateThreadDTO,
  PollVoteDTO,
  ThreadCommentDTO,
  ThreadInfoDTO,
  ThreadVoteDTO,
  ThreadVoteRespDTO,
  UpdateThreadDTO,
} from '@/model/dto/thread.dto';
import { PagingDTO, PagingRespDTO } from '@/model/dto/common.dto';

export const ThreadService = {
  add: async (
    apartmentId: string,
    addThreadDto: CreateThreadDTO
  ): Promise<ThreadInfoDTO> => {
    const { data } = await api.post<ThreadInfoDTO, CreateThreadDTO>(
      `/api/apartment/${apartmentId}/thread`,
      addThreadDto
    );
    return data;
  },
  edit: async (
    apartmentId: string,
    threadId: string,
    updateThreadDto: UpdateThreadDTO
  ): Promise<ThreadInfoDTO> => {
    const { data } = await api.put<ThreadInfoDTO, UpdateThreadDTO>(
      `/api/apartment/${apartmentId}/thread/${threadId}`,
      updateThreadDto
    );
    return data;
  },
  get: async (
    apartmentId: string,
    threadId: string
  ): Promise<ThreadInfoDTO> => {
    const { data } = await api.get<ThreadInfoDTO>(
      `/api/apartment/${apartmentId}/thread/${threadId}`
    );
    return data;
  },
  getAll: async (
    apartmentId: string,
    paging: PagingDTO,
    filters?: {
      tags?: string[];
      dateFrom?: string;
      dateTo?: string;
      hasMedia?: boolean;
      hasPoll?: boolean;
      scope?: 'ALL' | 'SAVED' | 'MINE';
    }
  ): Promise<PagingRespDTO<ThreadInfoDTO>> => {
    const { data } = await api.get<PagingRespDTO<ThreadInfoDTO>>(
      `/api/apartment/${apartmentId}/thread/list`,
      {
        params: {
          ...paging,
          ...(filters?.tags &&
            filters.tags.length > 0 && { tags: filters.tags.join(',') }),
          ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
          ...(filters?.dateTo && { dateTo: filters.dateTo }),
          ...(filters?.hasMedia && { hasMedia: true }),
          ...(filters?.hasPoll && { hasPoll: true }),
          ...(filters?.scope &&
            filters.scope !== 'ALL' && { scope: filters.scope }),
        },
      }
    );
    return data;
  },
  delete: async (apartmentId: string, threadId: string): Promise<void> => {
    await api.delete(`/api/apartment/${apartmentId}/thread/${threadId}`);
  },
  save: async (apartmentId: string, threadId: string): Promise<void> => {
    await api.post(`/api/apartment/${apartmentId}/thread/${threadId}/save`);
  },
  unsave: async (apartmentId: string, threadId: string): Promise<void> => {
    await api.delete(`/api/apartment/${apartmentId}/thread/${threadId}/save`);
  },
  vote: async (
    apartmentId: string,
    threadId: string,
    voteDTO: ThreadVoteDTO
  ): Promise<ThreadVoteRespDTO> => {
    const { data } = await api.post<ThreadVoteRespDTO, ThreadVoteDTO>(
      `/api/apartment/${apartmentId}/thread/vote/${threadId}`,
      voteDTO
    );
    return data;
  },
  createComment: async (
    apartmentId: string,
    threadId: string,
    commentDTO: CreateThreadCommentDTO
  ): Promise<ThreadCommentDTO> => {
    const { data } = await api.post<ThreadCommentDTO, CreateThreadCommentDTO>(
      `/api/apartment/${apartmentId}/thread/${threadId}/comment`,
      commentDTO
    );
    return data;
  },
  pollVote: async (
    apartmentId: string,
    pollId: string,
    voteDTO: PollVoteDTO
  ): Promise<ThreadInfoDTO> => {
    const { data } = await api.post<ThreadInfoDTO, PollVoteDTO>(
      `/api/apartment/${apartmentId}/poll/${pollId}/vote`,
      voteDTO
    );
    return data;
  },
  deleteComment: async (
    apartmentId: string,
    threadId: string,
    commentId: string
  ): Promise<void> => {
    await api.delete(
      `/api/apartment/${apartmentId}/thread/${threadId}/comment/${commentId}`
    );
  },
};
