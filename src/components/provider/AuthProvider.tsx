'use client';

import {createContext, ReactNode, useContext, useEffect, useState,} from 'react';
import {AuthService} from "@/service/auth-service";
import {User} from "@/model/auth.dto";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => void;
    refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await AuthService.getUser();
            setUser(res);

        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Invalid credentials');
            }

            await fetchUser();
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            setUser({...user, ...data});
        }
    };

    const refetchUser = async () => {
        await fetchUser();
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        refetchUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}