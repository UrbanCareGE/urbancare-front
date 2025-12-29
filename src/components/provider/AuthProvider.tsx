'use client';

import {createContext, ReactNode, useContext, useEffect} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {usePathname, useRouter} from 'next/navigation';
import {AuthService} from "@/service/auth-service";
import {ApartmentDTO} from "@/model/auth.dto";

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
    login: (phone: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => void;
    refetchUser: () => Promise<void>;
    selectApartment: (apartment: ApartmentDTO) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Routes that don't require authentication
const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];

// Check if current path is public
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
        refetch,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const {joinedApartments, ...dto} = await AuthService.getUserInfo();
            return {...dto, joinedApartments, selectedApartment: joinedApartments[0]} as User;
        },
        enabled: !isPublic, // Only fetch on protected routes
        retry: false,
        staleTime: 5 * 60 * 1e3,
        gcTime: 10 * 60 * 1e3,
    });

    // Redirect to login if on protected route and no user
    // useEffect(() => {
    //     if (!isPublic && !isLoading && !user && error) {
    //         fetch('/api/auth/logout', {method: 'POST', credentials: 'include'})
    //             .finally(() => router.push('/login'));
    //     }
    // }, [user, isLoading, error, isPublic, router]);


    const loginMutation = useMutation({
        mutationFn: async ({phone, password}: { phone: string; password: string }) => {
            return await AuthService.login({phone, password});
        },
        onSuccess: async () => {
            await refetch();
            router.push('/');
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Logout failed');
        },
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            router.push('/login');
        },
    });

    const login = async (phone: string, password: string) => {
        await loginMutation.mutateAsync({phone, password});
    };

    const logout = async () => {
        await logoutMutation.mutateAsync();
    };

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
        login,
        logout,
        updateUser,
        refetchUser,
        selectApartment,
    };

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