'use client';

import {createContext, ReactNode, useContext} from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {usePathname, useRouter} from 'next/navigation';
import {AuthService} from "@/service/auth-service";
import {ApartmentDTO} from "@/model/auth.dto";
import {PulsingLoader} from "@/components/common/loader/GlobalLoader";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];

const isPublicRoute = (pathname: string) => {
    return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
};

export default function AuthProvider({children}: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    const isPublic = isPublicRoute(pathname);

    const {
        data: user,
        isLoading,
        error,
        isRefetching,
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
    };

    if (isLoading) {
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

export function useRequiredAuth(): Omit<AuthContextType, 'user'> & { user: User } {
    const context = useAuth();

    if (!context.user) {
        throw new Error('useRequiredAuth must be used in authenticated routes only');
    }
    return context as Omit<AuthContextType, 'user'> & { user: User };
}