import {api} from "@/lib/api-client";
import {
    CreateThreadCommentDTO,
    CreateThreadDTO,
    ThreadInfoDTO,
    ThreadVoteDTO,
    ThreadVoteRespDTO
} from "@/model/thread.dto";
import {IdWrapperDTO, PagingDTO, PagingRespDTO} from "@/model/common.dto";


export const ThreadService = {

    add: async (aparmentId: string, addThreadDto: CreateThreadDTO): Promise<void> => {
        return await api.post<void, CreateThreadDTO>(`/api/secure/thread/${aparmentId}/create`, addThreadDto);
    },
    getAll: async (aparmentId: string, paging: PagingDTO): Promise<PagingRespDTO<ThreadInfoDTO>> => {
        return await api.get<PagingRespDTO<ThreadInfoDTO>>(`/api/secure/thread/list/${aparmentId}`, {
            params: {
                ...paging
            }
        });
    },
    vote: async (threadId: string, voteDTO: ThreadVoteDTO): Promise<ThreadVoteRespDTO> => {
        return await api.post<ThreadVoteRespDTO, ThreadVoteDTO>(`/api/secure/thread/vote/${threadId}`, voteDTO);
    },
    createComment: async (threadId: string, commentDTO: CreateThreadCommentDTO): Promise<IdWrapperDTO> => {
        return await api.post<IdWrapperDTO, CreateThreadCommentDTO>(`/api/secure/thread/${threadId}/comment`, commentDTO);
    }
}