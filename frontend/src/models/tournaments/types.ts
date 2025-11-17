export type TournamentTemplate = {
  name: string;
  location: string;
  description: string | null;
  createdAt: Date;
  id: number;
  organizerId: number;
};

export type TournamentLight = {
  id: number;
  startsAt: string;
  registrationEndsAt: Date;
  createdAt: Date;
  fee: number;
  organizerId: number;
  template: TournamentTemplate;
  category: TournamentCategory;
  rating: string;
};

export enum TournamentCategory {
  MENS_SINGLES = "MENS_SINGLES",
  MENS_DOUBLES = 'MENS_DOUBLES',
  WOMENS_SINGLES = 'WOMENS_SINGLES',
  WOMENS_DOUBLES = 'WOMENS_DOUBLES',
  MIXED_DOUBLES = 'MIXED_DOUBLES',
  PRO_AM = 'PRO_AM',
}
