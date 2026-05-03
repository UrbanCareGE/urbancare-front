import { api } from '@/lib/api-client';
import type { AccessControllerDTO } from '@/model/dto/access.dto';

export const AccessService = {
  listControllers: async (
    apartmentId: string,
    block: string
  ): Promise<AccessControllerDTO[]> => {
    const { data } = await api.get<AccessControllerDTO[]>(
      `/api/apartment/${apartmentId}/access/controllers`,
      { params: { block } }
    );
    return data;
  },

  openDoor: async (
    apartmentId: string,
    controllerId: string,
    deviceIndex: number
  ): Promise<void> => {
    await api.post(
      `/api/apartment/${apartmentId}/access/controllers/${controllerId}/door/${deviceIndex}/open`
    );
  },

  openGate: async (
    apartmentId: string,
    controllerId: string,
    deviceIndex: number
  ): Promise<void> => {
    await api.post(
      `/api/apartment/${apartmentId}/access/controllers/${controllerId}/gate/${deviceIndex}/open`
    );
  },

  activateElevator: async (
    apartmentId: string,
    controllerId: string,
    deviceIndex: number
  ): Promise<void> => {
    await api.post(
      `/api/apartment/${apartmentId}/access/controllers/${controllerId}/elevator/${deviceIndex}/activate`
    );
  },

  callElevator: async (
    apartmentId: string,
    block: string,
    floor: number
  ): Promise<void> => {
    await api.post(
      `/api/apartment/${apartmentId}/access/elevator/call/${floor}`,
      undefined,
      { params: { block } }
    );
  },
};
