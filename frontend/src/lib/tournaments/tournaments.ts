import { TournamentLight } from "@/models/tournaments/types";
import { apiClient } from "../api";
import { CreateTournamentDto } from "../dto/tournaments.dto";

export const getOrganizerTournaments = (): Promise<TournamentLight[]> => {
  return apiClient("/tournaments/organizer", {
    method: "GET",
  });
};

export const createOrganizerTournament = (data: CreateTournamentDto) => {
  return apiClient("/tournaments", {
    body: JSON.stringify(data),
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
};

export const TOURNAMENTS_KEY = ["tournaments"];
export const getTournamentKey = (templateId: string) => [
  TOURNAMENTS_KEY,
  templateId,
];

export const ORGANIZER_TOURNAMENTS_KEY = ["tournaments"];
export const getOrganizerTournamentKey = (templateId: string) => [
  ORGANIZER_TOURNAMENTS_KEY,
  templateId,
];