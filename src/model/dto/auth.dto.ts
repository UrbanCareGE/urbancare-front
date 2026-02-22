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

export interface GetOtpDTO {
  phone: string;
}

export interface ChatDTO {
  id: string;
}

export type ApartmentRole = 'MEMBER' | 'ADMIN';

export interface ApartmentDTO {
  id: string;
  name: string;
  isManager: boolean;
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
