import {api} from "@/lib/api-client";
import {CreateThreadDTO} from "@/model/thread.dto";


export const ThreadService = {

    add: async (aparmentId: string, addThreadDto: CreateThreadDTO): Promise<void> => {
        return await api.post<void, CreateThreadDTO>(`/api/secure/thread/${aparmentId}/create`, addThreadDto);
    }

}