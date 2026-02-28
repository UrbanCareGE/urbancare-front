import { ApartmentDTO } from '@/model/dto/apartment.dto';

export interface RegisterDTO {
  phone: string;
  name: string;
  surname: string;
  password: string;
  otp: string;
}

export interface LoginDTO {
  phone: string;
  password: string;
}

export interface ChatDTO {
  id: string;
}

export interface UserDTO {
  id: string;
  phone: string;
  name: string;
  surname: string;
  email: string;
  profileImageId?: string;
  selectedApartmentId?: string;
  joinedApartments: ApartmentDTO[];
}

export interface UserSnapshotDTO {
  id: string;
  name: string;
  surname: string;
  profileImageId?: string;
}

export interface UpdateProfileDTO {
  name: string;
  surname: string;
}

export interface UpdateProfileImageDTO {
  profileImageId: string;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface CarDTO {
  id: string;
  licensePlate: string;
}

export interface AddCarDTO {
  licensePlate: string;
}
