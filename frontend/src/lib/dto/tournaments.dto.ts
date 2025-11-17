import { TournamentCategory } from "@/models/tournaments/types";

export type CreateTournamentTemplateDto = {
  name: string;
  location: string;
  description?: string;
};

export type CreateTournamentDto = {
  startsAt: Date;
  templateId: number;
  category: TournamentCategory;
  rating: string;
  fee: number;
}