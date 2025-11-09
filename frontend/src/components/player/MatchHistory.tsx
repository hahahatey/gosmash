import { Match, ParticipantId, Tournament } from "@/mocks/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { getTournamentTitle } from "@/models/tournament";
import { declineNoun, formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Medal, Trophy } from "lucide-react";
import { getParticipantName, getPlayerPlace } from "@/models/player";
import {
  getPlayerFromMatch,
  getPlayerOpponents,
  getScore,
  isPlayerWinner,
} from "@/models/match";
import { playersMap } from "@/mocks/players";

const OPENED_ACCORDION_ITEMS_DEFAULT = 3;

type Props = {
  tournaments: Tournament[];
  playerId: ParticipantId;
  playedMatchesByTournament: Record<number, Match[]>;
};

export const MatchHistory: React.FC<Props> = ({ tournaments, playerId, playedMatchesByTournament }) => {
  const openedTournamentsByDefault = tournaments
    .slice(0, OPENED_ACCORDION_ITEMS_DEFAULT)
    .map((x) => String(x.id));

  return (
    <Accordion
      type="multiple"
      defaultValue={openedTournamentsByDefault}
      className="space-y-4"
    >
      {tournaments.map((tournament) => {
        const matches = playedMatchesByTournament[tournament.id];

        const place = getPlayerPlace(matches, playerId);

        return (
          <AccordionItem
            key={tournament.id}
            value={String(tournament.id)}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center justify-between w-full mr-4">
                <div className="text-left">
                  <h3 className="text-lg">
                    {getTournamentTitle(tournament)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(tournament.date)} • {matches.length}{" "}
                    {declineNoun(matches.length, ["матч", "матча", "матчей"])}
                  </p>
                </div>
                {place && (
                  <Badge
                    className={`${getPlaceColor(
                      place
                    )} flex items-center gap-1 self-start md:self-auto`}
                  >
                    {getPlaceIcon(place)}
                    {place} место
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-3">
                {matches.map((match) => {
                  const isWinner = isPlayerWinner(match, playerId);
                  const opponentsIds = getPlayerOpponents(match, playerId);

                  const playerInMatch = getPlayerFromMatch(match, playerId);

                  const opponetsText = getParticipantName(
                    opponentsIds.map((x) => playersMap[x])
                  );

                  return (
                    <div
                      key={match.id}
                      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getStageBadgeColor(match.round)} variant="secondary">
                              {getStageLabel(match.round)}
                            </Badge>
                          </div>
                          <div className="font-medium text-gray-900">
                            {getParticipantName(
                              playerInMatch.map((x) => playersMap[x])
                            )}{" "}
                            - {opponetsText}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              isWinner
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-red-500 hover:bg-red-600 text-white"
                            }
                          >
                            {getScore(match, playerInMatch)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

const getPlaceIcon = (place: number) => {
  if (place <= 3) {
    return <Medal className="w-4 h-4" />;
  }
  return <Trophy className="w-4 h-4" />;
};

const getPlaceColor = (place: number) => {
  switch (place) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    case 3:
      return "bg-gradient-to-r from-amber-600 to-amber-800 text-white";
    default:
      return "bg-tennis-clay text-white";
  }
};

const getStageLabel = (round?: string) => {
  switch (round) {
    case "1/8":
      return "1/8 финала";
    case "1/4":
      return "1/4 финала";
    case "1/2":
      return "1/2 финала";
    case "final":
      return "Финал";
    case 'third':
      return 'За 3 место';
    default:
      return "Групповой этап";
  }
};

const getStageBadgeColor = (round?: string) => {
  if (round) {
    switch (round) {
      case "final":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
    }
  }
  else {
    return "bg-gray-100 text-gray-700";
  }
};