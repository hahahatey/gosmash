export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  telegramNickname: string;
  birthDate: Date;
  telegramId: bigint | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: number;
};
