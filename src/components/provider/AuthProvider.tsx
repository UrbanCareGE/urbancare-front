'use client';

import {createContext, ReactNode, useContext} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {usePathname, useRouter} from 'next/navigation';
import {AuthService} from "@/service/auth-service";
import {ApartmentDTO, LoginDTO, UserDTO} from "@/model/auth.dto";
import {PulsingLoader} from "@/components/common/loader/GlobalLoader";
import {RouteConfig} from "@/proxy";
import {ErrorResponse} from "@/model/common.dto";

export interface User {
    id: string;
    phone: string;
    name: string;
    surname: string;
    profileImageId?: string;
    joinedApartments: ApartmentDTO[];
    selectedApartment: ApartmentDTO;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    updateUser: (data: Partial<User>) => void;
    refetchUser: () => Promise<void>;
    selectApartment: (apartment: ApartmentDTO) => void;
    logIn: (credentials: LoginDTO) => void;
    logOut: () => void;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    loginError: ErrorResponse | null;
    resetLoginError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isPublicRoute = (pathname: string) => {
    return RouteConfig.public.some(route => pathname.startsWith(route));
};

export default function AuthProvider({children}: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    const isPublic = isPublicRoute(pathname);

    const {
        data: user,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {joinedApartments, ...dto} = await AuthService.getUserInfo();
            return {...dto, joinedApartments, selectedApartment: joinedApartments[0]} as User;
        },
        enabled: !isPublic,
        retry: false,
        staleTime: 5 * 60 * 1e3,
        gcTime: 10 * 60 * 1e3,
    });

    const loginMutation = useMutation<UserDTO, ErrorResponse, LoginDTO>({
        mutationFn: AuthService.login,
        onSuccess: async (user) => {
            const {joinedApartments, ...dto} = user
            queryClient.setQueryData(['user'], {
                ...dto,
                joinedApartments,
                selectedApartment: joinedApartments[0]
            } as User)
            if (user?.joinedApartments?.length) {
                router.replace(`/apartment/${user.joinedApartments[0].id}`);
            }
        },
    });

    const logoutMutation = useMutation<void, ErrorResponse>({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            queryClient.clear();
            window.location.href = '/auth/login';
        },
    });

    const selectApartment = (apartment: ApartmentDTO) => {
        queryClient.setQueryData(['user'], (old: User | null) => {
            if (!old) return null;
            return {...old, selectedApartment: apartment};
        });
    };

    const updateUser = (data: Partial<User>) => {
        queryClient.setQueryData(['user'], (old: User | null) => {
            if (!old) return null;
            return {...old, ...data};
        });
    };

    const refetchUser = async () => {
        await refetch();
    };

    const value: AuthContextType = {
        user: user ?? null,
        isLoading: isPublic ? false : isLoading,
        isAuthenticated: !!user,
        updateUser,
        refetchUser,
        selectApartment,
        logIn: loginMutation.mutate,
        logOut: logoutMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        loginError: loginMutation.error,
        resetLoginError: loginMutation.reset,
    };

    if (isLoading && !isPublic) {
        return <PulsingLoader/>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}