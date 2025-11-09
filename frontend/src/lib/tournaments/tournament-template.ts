import { TournamentTemplate } from "@/models/tournaments";
import { apiClient } from "../api";
import { CreateTournamentTemplateDto } from "../dto/tournaments.dto";

export const createTournamentTemplate = (data: CreateTournamentTemplateDto) => {
  return apiClient("/tournament-templates", {
    body: JSON.stringify(data),
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
};

export const getTournamentTemplates = (): Promise<TournamentTemplate[]> => {
  return apiClient("/tournament-templates", {
    method: "GET",
  });
};

export const deleteTournamentTemplate = (id: number): Promise<TournamentTemplate[]> => {
  return apiClient(`/tournament-templates/${id}`, {
    method: "DELETE",
  });
};

export const TOURNAMENT_TEMPLATES_KEY = ["tournament-templates"];
export const getTournamentTemplateKey = (templateId: string) => [
  TOURNAMENT_TEMPLATES_KEY,
  templateId,
];
