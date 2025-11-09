"use client"; // ← ⚠️ Обязательно!

import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuth(); // ← теперь можно: это Client Component

  return <>{children}</>;
}
