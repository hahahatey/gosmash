
"use client"
import { getUserRoleFromToken } from '@/lib/auth/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const withOrganizerAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const role = getUserRoleFromToken();

      if (!role) {
        // Не залогинен → на логин
        router.replace('/login');
      } else if (role !== 'ORGANIZER') {
        // Залогинен, но не организатор → запрет
        router.replace('/unauthorized');
      }
      // Иначе — остаёмся на странице
    }, [router]);

    // Пока решаем, что показывать — ничего не рендерим
    const role = getUserRoleFromToken();
    if (!role || role !== 'ORGANIZER') {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};