import { formatDate } from "@/lib/utils";
import { MapPin, Trophy, Users, Calendar } from "lucide-react";
import { Tournament, TournamentParticipants } from "@/mocks/types";

type Props = {
  tournament: Tournament;
  participants: TournamentParticipants[];
};

export const SidebarInfo: React.FC<Props> = ({
  tournament: { date, location, prize, participantsNumber },
  participants,
}) => {
  return (
    <>
      <div className="flex items-center text-sm">
        <Calendar className="h-4 w-4 mr-3 text-tennis-green" />
        <div>
          <div className="font-medium">Даты проведения</div>
          <div className="text-gray-600">{formatDate(date)}</div>
        </div>
      </div>

      <div className="flex items-center text-sm">
        <MapPin className="h-4 w-4 mr-3 text-tennis-green" />
        <div>
          <div className="font-medium">Место проведения</div>
          <div className="text-gray-600">{location}</div>
        </div>
      </div>

      <div className="flex items-center text-sm">
        <Users className="h-4 w-4 mr-3 text-tennis-green" />
        <div>
          <div className="font-medium">Участники</div>
          <div className="text-gray-600">
            {participants.length} из {participantsNumber}
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm">
        <Trophy className="h-4 w-4 mr-3 text-tennis-green" />
        <div>
          <div className="font-medium">Призовой фонд</div>
          <div className="text-gray-600">{prize}</div>
        </div>
      </div>
    </>
  );
};
