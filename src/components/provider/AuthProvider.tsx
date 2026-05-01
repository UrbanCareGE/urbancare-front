'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { AuthService } from '@/service/auth-service';
import { LoginDTO, LoginWithOtpDTO, UserDTO } from '@/model/dto/auth.dto';
import { PulsingLoader } from '@/components/common/loader/GlobalLoader';
import { ConnectionError } from '@/components/common/error/ConnectionError';
import { RouteConfig } from '@/proxy';
import { ErrorResponse } from '@/model/dto/common.dto';
import { getApartmentWithId } from '@/lib/utils';
import { ApiError } from '@/model/api-error';
import { UserModel } from '@/model/model/user.model';

export interface AuthContextType {
  user: UserModel;
  isLoading: boolean;
  isAuthenticated: boolean;
  isManager?: boolean;
  updateUser: (data: Partial<UserModel>) => void;
  refetchUser: () => Promise<void>;
  selectApartment: (apartment: string, redirectTo?: string) => void;
  logIn: (credentials: LoginDTO) => void;
  logInWithOtp: (credentials: LoginWithOtpDTO) => void;
  logOut: () => void;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  loginError: ErrorResponse | null;
  resetLoginError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isAuthError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const status = (error as ApiError)?.httpStatus;
    return status == 401 || status === 403;
  }
  return false;
}

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
  const router = useRouter();

  const isPublic = isPublicRoute(pathname);
  const isMixed = isMixedRoute(pathname);

  const handleAuthError = useCallback(() => {
    queryClient.clear();
    window.location.href = '/landing';
  }, [queryClient]);

  const {
    data: user,
    isLoading,
    error,
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
    retry: (failureCount, error) => {
      if (isAuthError(error)) return false;
      return failureCount < 3;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
    staleTime: 5 * 60 * 1e3,
    gcTime: 10 * 60 * 1e3,
  });

  useEffect(() => {
    if (isError && !isPublic && !isMixed && isAuthError(error)) {
      handleAuthError();
    }
  }, [isError, error, isPublic, isMixed, handleAuthError]);

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
      if (user?.selectedApartmentId) {
        window.location.href = `/apartment/${user.selectedApartmentId}`;
        return;
      }
      if (user?.joinedApartments?.length) {
        window.location.href = `/apartment/${user.joinedApartments[0].id}`;
      } else {
        window.location.href = '/landing';
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const otpLoginMutation = useMutation<UserDTO, ErrorResponse, LoginWithOtpDTO>(
    {
      mutationFn: AuthService.loginWithOtp,
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

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');

        if (code) {
          window.location.href = `/join/${code}`;
          return;
        }
        if (user?.selectedApartmentId) {
          window.location.href = `/apartment/${user.selectedApartmentId}`;
          return;
        }
        if (user?.joinedApartments.length) {
          window.location.href = `/apartment/${user?.joinedApartments[0].id}`;
        } else {
          window.location.href = '/landing';
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const logoutMutation = useMutation<void, ErrorResponse>({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/auth/login';
    },
  });

  const selectApartment = (apartmentId: string, redirectTo?: string) => {
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

    queryClient.removeQueries({
      predicate: (query) => query.queryKey[0] !== 'user',
    });

    router.push(redirectTo ?? `/apartment/${apartmentId}`);
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

  if (isLoading && !isPublic) {
    return <PulsingLoader />;
  }

  if (isError && !isPublic && !isAuthError(error)) {
    return <ConnectionError onRetry={() => refetch()} isRetrying={isLoading} />;
  }

  if (!user && !isPublic) {
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
    logInWithOtp: otpLoginMutation.mutate,
    logOut: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending || otpLoginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error || otpLoginMutation.error,
    resetLoginError: () => {
      loginMutation.reset();
      otpLoginMutation.reset();
    },
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
