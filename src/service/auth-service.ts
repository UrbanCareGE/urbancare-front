import {apiCall} from "@/service/api";
import {ErrorResponse} from "@/model/common";

export const AuthService = {
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
