import { User } from "@/models/user";

export type SignInRequest = {
  telegramNickname: string;
  code: string;
}

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  birthDate?: string;
  email: string;
  telegramNickname: string;
}