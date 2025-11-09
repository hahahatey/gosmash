import { declineNoun } from "@/lib/utils";
import { playersMap } from "@/mocks/players";
import { Player, TournamentParticipants } from "@/mocks/types";
import { Badge } from "../ui/badge";
import { getPlayerName } from "@/models/player";
import Link from "next/link";

type Props = {
  participants: TournamentParticipants[];
};

export const ParticipantList: React.FC<Props> = ({ participants }) => {
  return (
    <>
      {participants.map((participant, index) => {
        const [player1, player2] = participant.playerId.map(
          (player) => playersMap[player]
        );
        return (
          <div
            key={player1.id + player2?.id}
            className="flex items-center px-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-tennis-light-clay text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <div className="ml-4 flex-grow">
              <ParticipantRow {...player1} />
              {player2 && <ParticipantRow {...player2} />}
            </div>
          </div>
        );
      })}
    </>
  );
};

const ParticipantRow: React.FC<Player> = (player) => {
  return (
    <div
      data-show-border="true"
      className="flex justify-between py-2 peer peer-data-[show-border=true]:border-t border-tennis-light-clay"
    >
      <div>
        <Link href={`/players/${player.id}`}><span className="font-medium">{getPlayerName(player)}</span></Link>
        <div className="text-sm text-gray-500">Новосибирск</div>
      </div>
      <div className="flex items-center gap-x-4">
        <Badge className="bg-green-600" title="Рейтинг">
          <span className="font-semibold">{player.rating}</span>
          <span className="text-x hidden md:block ml-1">рейтинг</span>
        </Badge>
        <Badge className="bg-yellow-400 hidden md:block">
          <span className="font-semibold mr-1">{player.points}</span>
          <span className="text-xs">
            {declineNoun(player.points, ["очко", "очка", "очков"])}
          </span>
        </Badge>
      </div>
    </div>
  );
};
