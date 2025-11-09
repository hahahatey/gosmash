
import { Match, ParticipantId } from "@/mocks/types";
import { getParticipantKey, playerEqual } from "./player";


export const getMatchLooser = ({winner, player1, player2}: Match) => {
  return winner === 1 ? player2 : player1; 
}

export const getMatchWinner = ({winner, player1, player2}: Match) => {
  return winner === 1 ? player1 : player2; 
}

export const isPlayerWinner = (match: Match, playerId: ParticipantId) => {
  return getMatchWinner(match).includes(playerId);
}

export const getPlayerOpponents = (match: Match, playerId: ParticipantId) => {
  return isPlayerWinner(match, playerId) ? getMatchLooser(match) : getMatchWinner(match);
}

export const getScore = (match: Match, playerId: ParticipantId[]) => {
  const winners = match.winner === 1 ? match.player1 : match.player2;

  return playerEqual(winners, playerId)
    ? `${match.scoreUp}/${match.scoreDown}`
    : `${match.scoreDown}/${match.scoreUp}`;
};

export const getPlayerFromMatch = (match: Match, playerId: ParticipantId) => {
  return match.player1.includes(playerId) ? match.player1 : match.player2;
}

export const getPlayerPlaceInGroup = (matches: Match[], groupCapacity: number): Record<string, number> => {
  if (matches.length !== groupCapacity) return {};

  const info: Record<string, {points: number; winnerCount: number}> = {};
  matches.forEach((match) => {
    const {scoreUp, scoreDown} = match;
    const looser = getMatchLooser(match);

    if (looser) {
      const key = getParticipantKey(looser);
      const item = info[key];
    
      info[key] = {
        points: (item?.points || 0) + scoreDown - scoreUp,
        winnerCount: (item?.winnerCount || 0),
      }
    }
    
    const winner = getMatchWinner(match);
    const key = getParticipantKey(winner);
    const item = info[key];

    info[key] = {
      points: (item?.points || 0) + scoreUp - scoreDown,
      winnerCount: (item?.winnerCount || 0) + 1,
    }
  });

  const sortedGroupPlayerByWinners = Object.keys(info).sort((a, b) => info[b].winnerCount - info[a].winnerCount);

  let res = [...sortedGroupPlayerByWinners];
  let start = null;
  for (let i = 1; i < sortedGroupPlayerByWinners.length; i++) {
    const prevWinnerCount = info[res[res.length - 1]].winnerCount;
    const currentWinnerCount = info[sortedGroupPlayerByWinners[i]].winnerCount;

    if (prevWinnerCount === currentWinnerCount) {
      if (start === null) {
        start = i - 1;
      }
    }
    else {
      if (start !== null) {
        res = [...res.slice(0, start), ...res.slice(start, i + 1).sort((a, b) => info[b].points - info[a].points), ...res.slice(i + 1)];
        start = null;
      }
    }
  }

  if (start !== null) {
    res = [...res.slice(0, start), ...res.slice(start).sort((a, b) => info[b].points - info[a].points)];
  }

  return res.reduce((res, current, index) => {
    res[current] = index + 1;
    return res;
  }, {} as Record<string, number>);
}
