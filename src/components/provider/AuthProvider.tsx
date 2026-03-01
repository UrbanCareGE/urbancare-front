'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { AuthService } from '@/service/auth-service';
import { LoginDTO, UserDTO } from '@/model/dto/auth.dto';
import { PulsingLoader } from '@/components/common/loader/GlobalLoader';
import { RouteConfig } from '@/proxy';
import { ErrorResponse } from '@/model/dto/common.dto';
import { ApartmentDTO } from '@/model/dto/apartment.dto';

export interface UserModel {
  id: string;
  phone: string;
  name: string;
  surname: string;
  profileImageId?: string;
  joinedApartments: ApartmentDTO[];
  selectedApartment?: ApartmentDTO;
  selectedApartmentId?: string;
}

export interface AuthContextType {
  user: UserModel;
  isLoading: boolean;
  isAuthenticated: boolean;
  isManager?: boolean;
  updateUser: (data: Partial<UserModel>) => void;
  refetchUser: () => Promise<void>;
  selectApartment: (apartment: string) => void;
  logIn: (credentials: LoginDTO) => void;
  logOut: () => void;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  loginError: ErrorResponse | null;
  resetLoginError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getApartmentWithId = (
  apartments: ApartmentDTO[],
  apartmentId?: string
) => {
  if (!apartments || apartments.length === 0) {
    return null;
  }
  if (apartmentId) {
    const apartmentIdx = apartments.findIndex(
      (apartment) => apartment.id === apartmentId
    );
    if (apartmentIdx === -1) return apartments[0];

    return apartments[apartmentIdx];
  }

  return apartments[0];
};

const isPublicRoute = (pathname: string) => {
  const normalizedPath =
    pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;

  return RouteConfig.public.some(
    (route) =>
      normalizedPath === route || normalizedPath.startsWith(route + '/')
  );
};

const isMixedRoute = (pathname: string) => {
  const normalizedPath =
    pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;

  return RouteConfig.publicAndAuth.some(
    (route) =>
      normalizedPath === route || normalizedPath.startsWith(route + '/')
  );
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isPublic = isPublicRoute(pathname);
  const isMixed = isMixedRoute(pathname);

  const handleAuthError = useCallback(() => {
    queryClient.clear();
    window.location.href = '/auth/login';
  }, [queryClient]);

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { joinedApartments, selectedApartmentId, ...dto } =
        await AuthService.getUserInfo();
      return {
        ...dto,
        joinedApartments,
        selectedApartmentId,
        selectedApartment: getApartmentWithId(
          joinedApartments,
          selectedApartmentId
        ),
      } as UserModel;
    },
    enabled: !isPublic || isMixed,
    retry: false,
    staleTime: 5 * 60 * 1e3,
    gcTime: 10 * 60 * 1e3,
  });

  useEffect(() => {
    if (isError && !isPublic && !isMixed) {
      handleAuthError();
    }
  }, [isError, isPublic, isMixed, handleAuthError]);

  const loginMutation = useMutation<UserDTO, ErrorResponse, LoginDTO>({
    mutationFn: AuthService.login,
    onSuccess: async (user) => {
      const { joinedApartments, selectedApartmentId, ...dto } = user;
      queryClient.setQueryData(['user'], {
        ...dto,
        joinedApartments,
        selectedApartmentId,
        selectedApartment: getApartmentWithId(
          joinedApartments,
          selectedApartmentId
        ),
      } as UserModel);
      if (user?.joinedApartments?.length) {
        window.location.href = `/apartment/${user.joinedApartments[0].id}`;
      } else {
        window.location.href = '/welcome';
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const logoutMutation = useMutation<void, ErrorResponse>({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/auth/login';
    },
  });

  const selectApartment = (apartmentId: string) => {
    queryClient.setQueryData(['user'], (old: UserModel | null) => {
      if (!old) return null;
      return {
        ...old,
        selectedApartmentId: apartmentId,
        selectedApartment: getApartmentWithId(
          old?.joinedApartments,
          apartmentId
        ),
      } as UserModel;
    });
  };

  const updateUser = (data: Partial<UserModel>) => {
    queryClient.setQueryData(['user'], (old: UserModel | null) => {
      if (!old) return null;
      return { ...old, ...data };
    });
  };

  const refetchUser = async () => {
    await refetch();
  };

  // useEffect(() => {
  //   if (!isPublic && !user?.joinedApartments?.length) {
  //     window.location.href = '/welcome';
  //   }
  // }, [user, isPublic, pathname]);

  if ((isLoading || isError || !user) && !isPublic) {
    return <PulsingLoader />;
  }

  const value: AuthContextType = {
    user: user!,
    isLoading: isPublic ? false : isLoading,
    isAuthenticated: !!user,
    isManager: user?.selectedApartment?.isManager,
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
