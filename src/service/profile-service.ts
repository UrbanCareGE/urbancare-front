import {api} from '@/lib/api-client';
import {UpdateProfileDTO, UpdateProfileImageDTO, ChangePasswordDTO, UserDTO} from "@/model/auth.dto";
import {SuccessDTO} from "@/model/common.dto";

export const ProfileService = {
    updateProfile: async (data: UpdateProfileDTO): Promise<UserDTO> => {
        return api.put<UserDTO, UpdateProfileDTO>(
            '/api/secure/user/profile',
            data
        );
    },

    updateProfileImage: async (data: UpdateProfileImageDTO): Promise<UserDTO> => {
        return api.put<UserDTO, UpdateProfileImageDTO>(
            '/api/secure/user/profile/image',
            data
        );
    },

    changePassword: async (data: ChangePasswordDTO): Promise<SuccessDTO> => {
        return api.put<SuccessDTO, ChangePasswordDTO>(
            '/api/secure/user/password',
            data
        );
    }
};