// types.ts
export type CurrentUser = {
  id: number;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
}