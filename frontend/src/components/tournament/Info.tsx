import { Tournament, TournamentParticipants } from "@/mocks/types";
import { Progress } from "../ui/progress";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Props = {
  tournament: Tournament;
  participants: TournamentParticipants[];
}

export const Info: React.FC<Props> = ({tournament, participants}) => {
  const {entryFee, participantsNumber, registrationDeadline} = tournament;

  if (!participants?.length) return null;

  const registrationProgress = (participants.length / participantsNumber) * 100;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h4 className="font-semibold mb-2">Детали турнира</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Покрытие:</span>
            <span>Грунт</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Взнос:</span>
            <span className="font-semibold text-tennis-green">{entryFee}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Регистрация</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Заполнено мест:</span>
              <span>
                {participants.length}/{participantsNumber}
              </span>
            </div>
            <Progress value={registrationProgress} className="h-2" />
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Регистрация до: {formatDate(registrationDeadline)}
          </div>
        </div>
      </div>
    </div>
  );
};
