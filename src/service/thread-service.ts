import {api} from "@/lib/api-client";
import {
    CreateThreadCommentDTO,
    CreateThreadDTO,
    PollVoteDTO,
    ThreadCommentDTO,
    ThreadInfoDTO,
    ThreadVoteDTO,
    ThreadVoteRespDTO
} from "@/model/thread.dto";
import {PagingDTO, PagingRespDTO} from "@/model/common.dto";

export const ThreadService = {
    add: async (apartmentId: string, addThreadDto: CreateThreadDTO): Promise<ThreadInfoDTO> => {
        const { data } = await api.post<ThreadInfoDTO, CreateThreadDTO>(`/api/apartment/${apartmentId}/thread`, addThreadDto);
        return data;
    },
    get: async (apartmentId: string, threadId: string): Promise<ThreadInfoDTO> => {
        const { data } = await api.get<ThreadInfoDTO>(`/api/apartment/${apartmentId}/thread/${threadId}`);
        return data;
    },
    getAll: async (apartmentId: string, paging: PagingDTO, tags?: string[]): Promise<PagingRespDTO<ThreadInfoDTO>> => {
        const { data } = await api.get<PagingRespDTO<ThreadInfoDTO>>(`/api/apartment/${apartmentId}/thread/list`, {
            params: {
                ...paging,
                ...(tags && tags.length > 0 && {tags: tags.join(',')})
            }
        });
        return data;
    },
    vote: async (apartmentId: string, threadId: string, voteDTO: ThreadVoteDTO): Promise<ThreadVoteRespDTO> => {
        const { data } = await api.post<ThreadVoteRespDTO, ThreadVoteDTO>(`/api/apartment/${apartmentId}/thread/vote/${threadId}`, voteDTO);
        return data;
    },
    createComment: async (apartmentId: string, threadId: string, commentDTO: CreateThreadCommentDTO): Promise<ThreadCommentDTO> => {
        const { data } = await api.post<ThreadCommentDTO, CreateThreadCommentDTO>(`/api/apartment/${apartmentId}/thread/${threadId}/comment`, commentDTO);
        return data;
    },
    pollVote: async (apartmentId: string, pollId: string, voteDTO: PollVoteDTO): Promise<ThreadInfoDTO> => {
        const { data } = await api.post<ThreadInfoDTO, PollVoteDTO>(`/api/apartment/${apartmentId}/poll/${pollId}/vote`, voteDTO);
        return data;
    }
}