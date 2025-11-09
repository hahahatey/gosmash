import { getParticipantsByGroup } from "@/models/tournament";
import TournamentGroupTable, { GroupPlayer } from "./TournamentGroupTable";
import {
  getParticipantKey,
  getParticipantName,
  playerEqual,
} from "@/models/player";
import { playersMap } from "@/mocks/players";
import { matches } from "@/mocks/matches";
import { getPlayerPlaceInGroup, getScore } from "@/models/match";

type Props = {
  tournamentId: number;
};

export const Qualification: React.FC<Props> = ({ tournamentId }) => {
  const groups = getParticipantsByGroup(tournamentId);

  return (
    <>
      {Object.entries(groups).map(([groupId, groupsParticipants], index) => {
        const placeMap = getPlayerPlaceInGroup(
          matches.filter(
            (x) =>
              x.groupId === Number(groupId) && x.tournamentId === tournamentId
          ),
          groupsParticipants.length
        );
        const players = groupsParticipants.map(({ playerId }) => {
          const groupMatches = matches.filter(
            (x) =>
              (playerEqual(playerId, x.player1) ||
                playerEqual(playerId, x.player2)) &&
              x.groupId !== undefined
          );

          const parsedMatches = groupMatches.reduce((result, match) => {
            const opponentId = playerEqual(playerId, match.player1)
              ? match.player2
              : match.player1;

            const indexInGroup = groupsParticipants.findIndex((x) =>
              playerEqual(x.playerId, opponentId)
            );

            result[indexInGroup] = getScore(match, playerId);

            return result;
          }, {} as { [key: string]: string });

          return {
            name: getParticipantName(
              playerId.map((playerId) => playersMap[playerId])
            ),
            place:
              placeMap[getParticipantKey(playerId)] ||
              groupsParticipants.length,
            matches: parsedMatches,
          } as GroupPlayer;
        });

        return (
          <TournamentGroupTable
            key={index}
            players={players}
            groupName={`Группа ${index + 1}`}
          />
        );
      })}
    </>
  );
};
