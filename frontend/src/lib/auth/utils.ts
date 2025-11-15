import { UserRole } from "@/models/user";

export interface JwtPayload {
  id: string;
  role: UserRole;
  exp: number; // timestamp in seconds
  iat: number;
}

/**
 * Безопасно извлекает роль из JWT
 * Возвращает null, если:
 * - токена нет,
 * - токен повреждён,
 * - токен просрочен
 */
export function getUserRoleFromToken(): UserRole | null {
  // Работаем только на клиенте
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }

  try {
    // Разделяем токен
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Декодируем payload
    const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decodedJson = atob(payloadBase64);
    const payload: JwtPayload = JSON.parse(decodedJson);

    // Проверяем срок действия
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      localStorage.removeItem('accessToken'); // очищаем просроченный токен
      return null;
    }

    return payload.role;
  } catch (e) {
    console.warn('Failed to parse JWT', e);
    localStorage.removeItem('accessToken');
    return null;
  }
}

/**
 * Проверяет, является ли пользователь организатором
 */
export function isOrganizer(): boolean {
  return getUserRoleFromToken() === 'ORGANIZER';
}

/**
 * Проверяет, авторизован ли пользователь
 */
export function isAuthenticated(): boolean {
  return getUserRoleFromToken() !== null;
}

export const saveToStorageTelegramNickname = (nickname: string) => {
  // localStorage.setItem('gosmash_telegram_nick', nickname);
}

export const getStoragedTelegramNickname = () => {
  // localStorage.getItem('gosmash_telegram_nick');
}