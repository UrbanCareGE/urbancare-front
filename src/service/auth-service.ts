import {apiCall} from "@/service/api";

export const AuthService = {
    login: async (loginReq: LoginReq): Promise<string> => {
        try {
            const response = await apiCall<string, LoginReq>(
                "post",
                "/auth/login",
                {
                    data: loginReq,
                    apiName: "URBANCARE_API",
                }
            );

            const token = response.headers["access-token"];

            return token;
        } catch (err) {
            throw err;
        }
    },
    register: async (registerDTO: RegisterReq): Promise<string> => {
        try {
            const response = await apiCall<string, RegisterReq>(
                "post",
                "/auth/register",
                {
                    data: registerDTO,
                    apiName: "URBANCARE_API",
                }
            );

            const token = response.headers["access-token"];

            return token;
        } catch (err) {
            throw err;
        }
    },
    generateOtp: async (contact: string): Promise<string> => {
        try {
            debugger;
            const response = await apiCall<string, RegisterReq>(
                "post",
                "/auth/otp/generate",
                {
                    apiName: "URBANCARE_API",
                    params: {
                        contact
                    }
                }
            );

            const otp: string = response?.data;

            return otp;
        } catch (err) {
            throw err;
        }
    }
};
