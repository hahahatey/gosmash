
interface ApiClientOptions {
  baseUrl: string;
}

export const createAuthApiClient = ({ baseUrl }: ApiClientOptions) => {
  let isRefreshing = false;
  let refreshSubscribers: Array<(token: string) => void> = [];

  const onAccessTokenFetched = (accessToken: string) => {
    refreshSubscribers.forEach(callback => callback(accessToken));
    refreshSubscribers = [];
  };

  const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
  };

  const getTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  };

  const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Здесь можно вызвать колбэк на logout (например, обновить состояние Redux/Zustand)
    console.log('User logged out due to token expiration');
  };

  const refreshToken = async (): Promise<string | null> => {
    const { refreshToken: currentRefreshToken } = getTokens();
    if (!currentRefreshToken) {
      clearTokens();
      return null;
    }

    try {
      const res = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentRefreshToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        // Опционально: обновить refreshToken, если сервер его возвращает
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        return data.accessToken;
      } else {
        clearTokens();
        return null;
      }
    } catch (error) {
      console.error('Refresh failed:', error);
      clearTokens();
      return null;
    }
  };

  const authFetch = async <TResponse>(
    url: string,
    options: RequestInit = {}
  ): Promise<TResponse> => {
    const { accessToken } = getTokens();

    // Добавляем accessToken ко всем запросам (кроме /auth/*, если нужно)
    const headers = new Headers(options.headers);
    if (accessToken && !url.startsWith('/auth/')) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    let response = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers,
    });

    // Если 401 — пробуем обновить токен
    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const newAccessToken = await refreshToken();
        isRefreshing = false;

        if (newAccessToken) {
          // Повторяем оригинальный запрос с новым токеном
          const newHeaders = new Headers(options.headers);
          newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
          response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: newHeaders,
          });
          onAccessTokenFetched(newAccessToken);
        } else {
          // Refresh не удался — logout
          clearTokens();
        }
      } else {
        // Ждём, пока завершится текущий refresh
        const newAccessToken = await new Promise<string | null>((resolve) => {
          addRefreshSubscriber((token) => resolve(token));
        });

        if (newAccessToken) {
          const newHeaders = new Headers(options.headers);
          newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
          response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers: newHeaders,
          });
        } else {
          clearTokens();
        }
      }
    }

    if (response.ok) {
      return response.json();
    }
    else {
      const errorData = await response.json();
      // Передаём весь объект ошибки, чтобы можно было проверить errorCode
      throw errorData;
    }
  };

  return authFetch;
};