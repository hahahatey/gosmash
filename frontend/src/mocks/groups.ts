import { Group } from "./types";

const makeGroupOf = (tournamentId: number, groupNumber: number): Group[] => {
  return Array.from({length: groupNumber}, (_, i) => ({tournamentId, id: i + 1}));
};

export const groups: Record<number, Group[]> = {
  1: makeGroupOf(1, 4),
  2: makeGroupOf(1, 4),
};
