interface RegisterReq {
    phone: string;
    name: string;
    surname: string;
    password: string;
    otp: string;
}

interface LoginReq {
    phone: string;
    password: string;
}

interface GetOtpReq {
    phone: string;
}