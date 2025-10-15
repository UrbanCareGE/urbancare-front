export interface RegisterReq {
    phone: string;
    name: string;
    surname: string;
    password: string;
    otp: string;
}

export interface LoginReq {
    phone: string;
    password: string;
}

export interface GetOtpReq {
    phone: string;
}

export interface Chat {
    id: string;
}

export interface Apartment {
    id: string;
    name: string;
}

export interface User {
    id: string;
    phone: string;
    name: string;
    surname: string;
    joinedApartments: Apartment[];
}