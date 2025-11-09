import { groupBy } from "@/lib/utils";
import { matches, matchesByTournament } from "@/mocks/matches";
import { participantsByTournament } from "@/mocks/tournamentsParticipants";
import { Match, Player, TournamentParticipants, TournamentType } from "@/mocks/types";
import { getMatchLooser, getMatchWinner } from "./match";
import { playersMap } from "@/mocks/players";

export const getParticipantsByGroup = (
  tournamentId: number
): Record<string | number, TournamentParticipants[]> => {
  const byGroup = groupBy(participantsByTournament[tournamentId], "groupId");
  return Object.entries(byGroup).reduce((result, [groupId, groupData]) => {
    result[Number(groupId)] = groupData.sort(
      (a, b) => a.groupWeight - b.groupWeight
    );
    return result;
  }, {} as Record<string | number, TournamentParticipants[]>);
};

export type Node = {
  left?: Node;
  right?: Node;
  value: Match | null;
};

// export const createPlayoffBracket = (
//   tournamentId: number,
//   participantNumbers: number
// ) => {
//   const tournamentMatches = matches.filter(
//     (x) => x.tournamentId === tournamentId
//   );

//   const upperMatches = tournamentMatches.filter((x) => x.type === "upper");

//   const final = upperMatches.find((x) => x.round === "final");

//   const root: Node = { left: undefined, right: undefined, value: final };

//   deep(root, '', upperMatches);

//   return root;
// };

// const deep = (node: Node, prev: string, matches: Match[]) => {
//   // const round = getRound(prev);

//   const [left, right] =
//     matches.filter((x) => node.value.parentsMatch?.some((y) => y === x.id)) ||
//     [];

//   if (!left || !right) return;

//   const leftNode = {
//     left: undefined,
//     right: undefined,
//     value: left,
//   };

//   const rightNode = {
//     left: undefined,
//     right: undefined,
//     value: right,
//   };

//   node.left = leftNode;
//   node.right = rightNode;

//   deep(leftNode, "", matches);
//   deep(rightNode, "", matches);
// };

// const getRound = (nextRound: string) => {
//   switch (nextRound) {
//     case "final":
//       return "1/2";
//     case "1/2":
//       return "1/4";
//     case "1/4":
//       return "1/8";
//     default:
//       return null;
//   }
// };

export const createPlayoffBracket2 = (tournamentId: number, participantNumber: number) => {
  const tournamentMatches = matches.filter(
    (x) => x.tournamentId === tournamentId
  );
  const upperMatches = tournamentMatches.filter((x) => x.type === "upper");

 
  const preparedParticipantNumber = participantNumber / 2;
  let currentRound = preparedParticipantNumber;
  const roundNumber = Math.log2(preparedParticipantNumber);

  const res: Match[][] = Array.from({length: roundNumber}, () => {
    const roundKey = `1/${currentRound}`;
    const roundMatches = upperMatches.filter(x => x.round === roundKey);
    currentRound = currentRound / 2;
    return roundMatches;
  });

  const final = upperMatches.find((x) => x.round === "final");
  res.push([final!]);
  return {upper: res, third: upperMatches.find(x => x.round === 'third')};
}

export const getTournamentLabelFromType = (type: TournamentType) => {
  switch (type) {
    case "man-single":
      return "Мужская одиночка";
    case "woman-single":
      return "Женская одиночка";
    case "man-pairs":
      return "Мужская пара";
    case "woman-pairs":
      return "Женская пара";
    default:
      return "Микст";
  }
};

type TournamentTitleParams = {
  type: TournamentType;
  rating: number;
};

export const getTournamentTitle = ({ type, rating }: TournamentTitleParams) => {
  return `${getTournamentLabelFromType(type)}, ${rating.toFixed(1)}`;
};

export const getTournamentWinners = (tournamentId: number): [Player[], Player[], [Player]] | null => {
  const matches = matchesByTournament[tournamentId];

  if (!matches) {
    return null;
  }

  const final = matches.find(x => x.round === 'final');

  if (!final) return null;

  const result = [getMatchWinner(final).map(x => playersMap[x]), getMatchLooser(final).map(x => playersMap[x])];

  const third = matches.find(x => x.round === 'third');

  if (!third) return null;

  result.push(getMatchWinner(third).map(x => playersMap[x]));

  return result as [Player[], Player[], [Player]];
}

