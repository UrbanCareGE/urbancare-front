import {api} from "@/lib/api-client";
import {
    CreateThreadCommentDTO,
    CreateThreadDTO, ThreadCommentDTO,
    ThreadInfoDTO,
    ThreadVoteDTO,
    ThreadVoteRespDTO
} from "@/model/thread.dto";
import {IdWrapperDTO, PagingDTO, PagingRespDTO} from "@/model/common.dto";


export const ThreadService = {
    add: async (apartmentId: string, addThreadDto: CreateThreadDTO): Promise<ThreadInfoDTO> => {
        return await api.post<ThreadInfoDTO, CreateThreadDTO>(`/api/secure/thread/${apartmentId}/create`, addThreadDto);
    },
    get: async (threadId: string): Promise<ThreadInfoDTO> => {
        return await api.get<ThreadInfoDTO>(`/api/secure/thread/${threadId}`);
    },
    getAll: async (apartmentId: string, paging: PagingDTO): Promise<PagingRespDTO<ThreadInfoDTO>> => {
        return await api.get<PagingRespDTO<ThreadInfoDTO>>(`/api/secure/thread/list/${apartmentId}`, {
            params: {
                ...paging
            }
        });
    },
    vote: async (threadId: string, voteDTO: ThreadVoteDTO): Promise<ThreadVoteRespDTO> => {
        return await api.post<ThreadVoteRespDTO, ThreadVoteDTO>(`/api/secure/thread/vote/${threadId}`, voteDTO);
    },
    createComment: async (threadId: string, commentDTO: CreateThreadCommentDTO): Promise<ThreadCommentDTO> => {
        return await api.post<ThreadCommentDTO, CreateThreadCommentDTO>(`/api/secure/thread/${threadId}/comment`, commentDTO);
    }
}