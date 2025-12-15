import {ApartmentContact, ApartmentDocument} from "@/model/info.dto";
import {api} from "@/lib/api-client";

export const InfoService = {
    nextGetContacts: async (token: string): Promise<ApartmentContact[]> => {
        return await api.get<ApartmentContact[]>(`/api/secure/apartment/68efd03837b62ea34882f812/data/contacts`, { server: true, authToken: token })
    },
    nextGetDocs: async (token: string): Promise<ApartmentDocument[]> => {
        return await api.get<ApartmentDocument[]>(`/api/secure/apartment/68efd03837b62ea34882f812/data/documents`, { server: true, authToken: token })
    }
}