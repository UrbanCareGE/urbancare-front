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

export interface ApartmentDTO {
    id: string;
    name: string;
}

export interface UserDTO {
    id: string;
    phone: string;
    name: string;
    surname: string;
    profileImageId?: string;
    joinedApartments: ApartmentDTO[];
}

export interface UserSnapshotDTO {
    id: string;
    name: string;
    surname: string;
    profileImageId?: string;
}