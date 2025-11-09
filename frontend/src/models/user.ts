export type User = {
  firstName: string;
  lastName: string;
  email: string;
  telegramNickname: string;
  birthDate: Date;
  telegramId: bigint | null;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  role: UserRole;
};

export type UserRole = 'ORGANIZER' | 'ADMIN' | 'USER';