import { User } from "@/models/user";
import { apiClient } from "../api"

export const getProfile = (): Promise<User | null> => {
  return apiClient('/auth/profile');
}

export const PROFILE_KEY = 'auth/profile';