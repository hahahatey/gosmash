"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signin as apiLogin,
  logout as apiLogout,
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getProfile, PROFILE_KEY } from "@/lib/profile/profile.api";

type Params = {
  onLoginInvalidOrExpired?: () => void;
  onError?: () => void;
};

export const useAuth = ({ onLoginInvalidOrExpired, onError }: Params = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const profileQuery = useQuery({
    queryKey: [PROFILE_KEY],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      // setAccessToken(data.accessToken);
      queryClient.setQueryData([PROFILE_KEY], data.user);
      router.push("/");
    },
    onError: (error: any) => {
      // Здесь обрабатываем конкретные ошибки
      if (error.errorCode === "LOGIN_CODE_EXPIRED") {
        onLoginInvalidOrExpired?.();
      } else if (error.statusCode === 401) {
        // setErrorMessage("Неверный код. Попробуйте снова.");
      } else {
        onError?.();
        // setErrorMessage("Произошла ошибка. Попробуйте позже.");
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      // clearAuth();
      queryClient.clear();
      // router.push('/login');
    },
  });

  return {
    user: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isAuthenticated: !!profileQuery.data,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
