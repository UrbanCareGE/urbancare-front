export interface AccessDeviceDTO {
  name: string;
  metadata?: Record<string, unknown> | null;
}

export interface AccessControllerDTO {
  id: string;
  apartmentId: string;
  block: string;
  doors: AccessDeviceDTO[];
  elevators: AccessDeviceDTO[];
  gates: AccessDeviceDTO[];
}
