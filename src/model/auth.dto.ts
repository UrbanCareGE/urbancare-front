interface RegisterReq {
    contact: string;
    name: string;
    surname: string;
    password: string;
    otp: string;
}

interface LoginReq {
    contact: string;
    password: string;
}

interface GetOtpReq {
    contact: string;
}