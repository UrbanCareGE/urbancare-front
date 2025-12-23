import {ApartmentContact, ApartmentDocument, CarInfo, CreateApartmentDocument} from "@/model/info.dto";
import {api} from "@/lib/api-client";

export const InfoService = {
    nextGetContacts: async (token: string, apartmentId: string): Promise<ApartmentContact[]> => {
        return await api.get<ApartmentContact[]>(`/api/secure/apartment/${apartmentId}/data/contacts`, { server: true, authToken: token })
    },
    nextGetDocs: async (token: string, apartmentId: string): Promise<ApartmentDocument[]> => {
        return await api.get<ApartmentDocument[]>(`/api/secure/apartment/${apartmentId}/data/documents`, { server: true, authToken: token })
    },
    nextGetCars: async (token: string, apartmentId: string): Promise<CarInfo[]> => {
        return await api.get<CarInfo[]>(`/api/secure/apartment/${apartmentId}/data/cars`, { server: true, authToken: token })
    },
    clientAddDoc: async (apartmentId: string, doc: CreateApartmentDocument) => {
        return await api.post(`/api/secure/apartment/${apartmentId}/data/documents`, doc)
    }
}