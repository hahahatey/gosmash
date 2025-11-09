import { participantsByTournament } from "@/mocks/tournamentsParticipants";
import { Match, ParticipantId, Player } from "@/mocks/types";
import { isPlayerWinner } from "./match";

export const getPlayerName = (
  { firstName, lastName }: Player,
  { short }: { short: boolean } = { short: false }
) => (short ? `${firstName[0]}. ${lastName}` : `${firstName} ${lastName}`);

export const getParticipantName = (players: Player[]) => {
  return players.map(p => getPlayerName(p, {short: true})).join(' / ');
}

export const getParticipantKey = (playerId: ParticipantId[]) => playerId.join('/');

export const getParticipantByPlayerIds = (tournamentId: number, playerIds: ParticipantId[]) => {
  const participants = participantsByTournament[tournamentId];
  const idsStringified = JSON.stringify(playerIds);
  return participants.find(x => JSON.stringify(x.playerId) === idsStringified);
}

export const playerEqual = (players1: ParticipantId[], players2: ParticipantId[]) => JSON.stringify(players1) === JSON.stringify(players2);

export const getPlayerPlace = (matches: Match[], playerId: ParticipantId): 1 | 2 | 3 | null => {
  const matchForPlace = matches.find(x => x.type === 'upper' && ['third', 'final'].includes(x.round!));

  if (!matchForPlace) return null;

  const isWinner = isPlayerWinner(matchForPlace, playerId);

  if (matchForPlace.round === 'final') {
    return isWinner ? 1 : 2;
  }
  else {
    return isWinner ? 3 : null;
  }
}