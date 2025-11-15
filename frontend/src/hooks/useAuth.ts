"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signin as apiLogin,
  logout as apiLogout,
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getProfile, PROFILE_KEY } from "@/lib/profile/profile.api";
import { clearTokens } from "@/lib/apiClient";
import { useEffect } from "react";
import { saveToStorageTelegramNickname } from "@/lib/auth/utils";

type Params = {
  onLoginInvalidOrExpired?: () => void;
  onError?: () => void;
  disableProfileQuery?: boolean;
};

export const useAuth = ({ onLoginInvalidOrExpired, onError, disableProfileQuery = false }: Params = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const profileQuery = useQuery({
    queryKey: [PROFILE_KEY],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !disableProfileQuery,
  });

  const nickname = profileQuery.data?.telegramNickname;

  useEffect(() => {
    nickname && saveToStorageTelegramNickname(nickname);
  }, [nickname]);

  const loginMutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
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
      clearTokens();
      queryClient.setQueryData([PROFILE_KEY], null);
      router.push('/');
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


