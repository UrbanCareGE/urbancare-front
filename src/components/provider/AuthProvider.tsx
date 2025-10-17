'use client';

import {createContext, ReactNode, useContext,} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AuthService} from "@/service/auth-service";
import {User} from "@/model/auth.dto";

interface AuthContextType {
    user: User | null | undefined;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => void;
    refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({children}: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                return await AuthService.getUser();
            } catch (error) {
                console.error('Failed to fetch user:', error);
                return null;
            }
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const loginMutation = useMutation({
        mutationFn: async ({email, password}: { email: string; password: string }) => {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Invalid credentials');
            }

            return res.json();
        },
        onSuccess: async () => {
            await refetch();
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Logout failed');
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        },
    });

    const login = async (email: string, password: string) => {
        await loginMutation.mutateAsync({email, password});
    };

    const logout = async () => {
        await logoutMutation.mutateAsync();
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            queryClient.setQueryData(['user'], {...user, ...data});
        }
    };

    const refetchUser = async () => {
        await refetch();
    };

    const value = {
        user: user ?? null,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        refetchUser,
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}