import {ApartmentContact, ApartmentDocument, CarInfo, CreateApartmentDocument} from "@/model/info.dto";
import {api} from "@/lib/api-client";

export const InfoService = {
    nextGetContacts: async (token: string, apartmentId: string): Promise<ApartmentContact[]> => {
        const { data } = await api.get<ApartmentContact[]>(`/api/apartment/${apartmentId}/data/contacts`, { server: true, authToken: token });
        return data;
    },
    nextGetDocs: async (token: string, apartmentId: string): Promise<ApartmentDocument[]> => {
        const { data } = await api.get<ApartmentDocument[]>(`/api/apartment/${apartmentId}/data/documents`, { server: true, authToken: token });
        return data;
    },
    nextGetCars: async (token: string, apartmentId: string): Promise<CarInfo[]> => {
        const { data } = await api.get<CarInfo[]>(`/api/apartment/${apartmentId}/data/cars`, { server: true, authToken: token });
        return data;
    },
    clientAddDoc: async (apartmentId: string, doc: CreateApartmentDocument) => {
        const { data } = await api.post(`/api/apartment/${apartmentId}/data/documents`, doc);
        return data;
    }
}