import { ApartmentDTO } from '@/model/dto/apartment.dto';

export interface RegisterDTO {
  phone: string;
  name: string;
  surname: string;
  password: string;
  otp: string;
}

export interface PhoneNumberDTO {
  prefix: string;
  number: string;
}

export interface LoginDTO {
  phone: PhoneNumberDTO;
  password: string;
}

export interface LoginWithOtpDTO {
  phone: PhoneNumberDTO;
  otp: string;
}

export interface ChatDTO {
  id: string;
}

export interface UserDTO {
  id: string;
  phone: PhoneNumberDTO;
  name: string;
  surname: string;
  email: string;
  profileImageId?: string;
  selectedApartmentId?: string;
  joinedApartments: ApartmentDTO[];
  hasPassword: boolean;
}

export interface UserSnapshotDTO {
  id: string;
  name?: string;
  surname?: string;
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

export interface SetPasswordDTO {
  newPassword: string;
  otp: string;
}

export interface ChangePhoneDTO {
  phone: PhoneNumberDTO;
  otp: string;
}

export interface CarDTO {
  id: string;
  licensePlate: string;
}

export interface AddCarDTO {
  licensePlate: string;
}

export interface GenerateOtpDTO {
  phone: PhoneNumberDTO;
}
