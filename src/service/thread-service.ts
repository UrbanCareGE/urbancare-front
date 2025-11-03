import {api} from "@/lib/api-client";
import {CreateThreadDTO, ThreadInfoDTO, ThreadVoteDTO} from "@/model/thread.dto";
import {PagingDTO, PagingRespDTO} from "@/model/common.dto";


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
    vote: async (threadId: string, voteDTO: ThreadVoteDTO): Promise<number> => {
        return await api.post<number, ThreadVoteDTO>(`/api/secure/thread/vote/${threadId}`, voteDTO);
    }
}